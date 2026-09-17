/* ============================================================
   深爱炉实馆 · 讨论区数据文件 discussion.js
   ------------------------------------------------------------
   ★ 讨论区功能：发帖（仅文字）+ 帖子点赞 + 帖子评论。
   数据存在 Supabase 云端，所有访客共享，无需登录。

   ★★★ 使用前必须填写下面的两个密钥（和 announcements.js 里填的一模一样）★★★
   ------------------------------------------------------------
   ============================================================ */

/* ============================================================
   ★★ 互动功能配置（讨论区）：使用前必须填写 ★★
   ------------------------------------------------------------
   1. 打开 https://supabase.com → 登录你的账号 → 进入项目；
   2. 左侧菜单 Settings → API（或 API Keys）：
        - Project URL（形如 https://xxxx.supabase.co）
        - Publishable key（sb_publishable_ 开头）或 anon public key（eyJ 开头）
   3. 把下面两处引号里的内容替换成你自己的（和 announcements.js 一致）；
   4. 到 SQL Editor 执行"讨论区建表语句"一节的 SQL（必须，否则报错）。
   不想用讨论区功能时，保持下面两行原样不动即可，页面会自动隐藏发帖与帖子列表。
   ============================================================ */
const SUPABASE_URL = "https://lltbwxfmhwglvjibbsdy.supabase.co";   // ★ 改成你的 Project URL
const SUPABASE_ANON_KEY = "sb_publishable_CE86zWZRvs-lOXIT9Kz8TA_Yc8-u-ZQ";              // ★ 改成你的 Publishable key

/* ================= 渲染部分（一般不用动） ================= */

/* 是否已配置 Supabase：未配置时返回 false */
function 讨论区已配置() {
  return !(!SUPABASE_URL || SUPABASE_URL.indexOf("你的项目") !== -1);
}

/*
 * 渲染帖子列表：讨论区首页（discussion.html）使用。
 */
function 渲染帖子列表() {
  const 容器 = document.getElementById("帖子列表");
  if (!容器) return;

  // 未配置 Supabase 时，显示提示，隐藏发帖表单
  if (!讨论区已配置()) {
    容器.innerHTML = '<p class="互动提示">讨论区未启用：请先在 discussion.js 顶部填写 Supabase 密钥。</p>';
    const 表单 = document.getElementById("发帖表单");
    if (表单) 表单.style.display = "none";
    return;
  }

  const 客户端 = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function 加载帖子() {
    const { data, error } = await 客户端
      .from("posts")
      .select("id, nickname, content, created_at, image_url")
      .order("created_at", { ascending: false });

    if (error) {
      容器.innerHTML = '<p class="互动提示">帖子加载失败：' + error.message + "，请刷新重试。</p>";
      return;
    }
    if (!data || data.length === 0) {
      容器.innerHTML = '<p class="互动提示">还没有帖子，来发第一帖吧。</p>';
      return;
    }

    容器.innerHTML = data
      .map(function (帖子) {
        const 摘要 = 帖子.content.length > 60 ? 帖子.content.slice(0, 60) + "…" : 帖子.content;
        return (
          '<a class="帖子卡片" href="discussion-detail.html?id=' + 帖子.id + '">' +
            '<div class="帖子头部">' +
              '<span class="帖子昵称">' + 转义文本(帖子.nickname) + "</span>" +
              '<span class="帖子时间">' + 格式化时间(帖子.created_at) + "</span>" +
            "</div>" +
            '<div class="帖子正文">' + 转义文本(摘要) + "</div>" +
            (帖子.image_url ? '<img class="帖子图片" src="' + 帖子.image_url + '" alt="帖子图片" loading="lazy">' : "") +
            '<div class="帖子箭头">→</div>' +
          "</a>"
        );
      })
      .join("");
  }

  // 发帖提交
  const 表单 = document.getElementById("发帖表单");
  const 图片输入 = document.getElementById("发帖图片");
  const 图片已选 = document.getElementById("图片已选");

  // 选择图片后，在旁边显示文件名
  if (图片输入 && 图片已选) {
    图片输入.addEventListener("change", function () {
      if (图片输入.files && 图片输入.files[0]) {
        图片已选.textContent = "已选：" + 图片输入.files[0].name;
      } else {
        图片已选.textContent = "";
      }
    });
  }

  if (表单) {
    表单.addEventListener("submit", async function (事件) {
      事件.preventDefault();
      const 昵称 = document.getElementById("发帖昵称").value.trim() || "匿名炉友";
      const 内容 = document.getElementById("发帖内容").value.trim();
      if (!内容) {
        alert("帖子内容不能为空");
        return;
      }
      // 图片上传（可选）
      const 文件输入 = document.getElementById("发帖图片");
      const 文件 = 文件输入 ? 文件输入.files[0] : null;
      let 图片网址 = null;
      if (文件) {
        try {
          图片网址 = await 上传图片(文件, 客户端);
        } catch (上传错误) {
          alert(上传错误.message);
          return;
        }
      }

      const { error } = await 客户端.from("posts").insert({
        nickname: 昵称,
        content: 内容,
        image_url: 图片网址
      });
      if (error) {
        alert("发帖失败：" + error.message);
        return;
      }
      document.getElementById("发帖昵称").value = "";
      document.getElementById("发帖内容").value = "";
       if (文件输入) 文件输入.value = "";
       if (图片已选) 图片已选.textContent = "";
      加载帖子();
    });
  }

  加载帖子();
}

/*
 * 渲染帖子详情：讨论详情页（discussion-detail.html）使用。
 * 根据网址里的 ?id= 找到对应帖子并显示内容 + 点赞 + 评论。
 */
async function 渲染帖子详情() {
  const 容器 = document.getElementById("帖子正文");
  if (!容器) return;

  // 未配置 Supabase 时，只显示提示，不渲染互动区
  if (!讨论区已配置()) {
    容器.innerHTML = '<p class="互动提示">讨论区未启用：请先在 discussion.js 顶部填写 Supabase 密钥。</p>';
    return;
  }

  const 客户端 = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const 参数 = new URLSearchParams(window.location.search);
  const id = parseInt(参数.get("id"), 10) || 1;

  // 读取帖子内容
  const { data: 帖子, error } = await 客户端
    .from("posts")
    .select("id, nickname, content, created_at, image_url")
    .eq("id", id)
    .maybeSingle();

  if (error || !帖子) {
    容器.innerHTML = "<p>这条帖子不存在或已被删除，请返回讨论区查看其他帖子。</p>";
    return;
  }

  document.getElementById("帖子标题").textContent = 帖子.nickname + " 的帖子";
  document.title = 帖子.nickname + " 的帖子 - 讨论区 - 深爱炉实馆";
    容器.innerHTML =
    '<div class="帖子头部">' +
      '<span class="帖子昵称">' + 转义文本(帖子.nickname) + "</span>" +
      '<span class="帖子时间">' + 格式化时间(帖子.created_at) + "</span>" +
    "</div>" +
    '<div class="帖子正文">' + 转义文本(帖子.content) + "</div>" +
    (帖子.image_url ? '<img class="帖子图片" src="' + 帖子.image_url + '" alt="帖子图片">' : "");


  // 互动区：点赞 + 评论
  渲染互动区(客户端, 容器, id);
}

/* ================= 互动区（帖子点赞 + 帖子评论） ================= */
function 渲染互动区(客户端, 正文容器, 帖子id) {
  正文容器.insertAdjacentHTML(
    "afterend",
    '<div class="互动区">' +
      '<div class="点赞区">' +
        '<button class="点赞按钮" type="button">赞 <span class="赞数">0</span></button>' +
        '<div class="点赞提示">全局共享点赞，点一次加一，不限次数</div>' +
      "</div>" +
      '<div class="评论区">' +
        "<h3 class='评论标题'>评论</h3>" +
        '<form class="评论表单">' +
          '<input class="评论昵称" type="text" maxlength="12" placeholder="昵称（可不填，默认匿名炉友）">' +
          '<textarea class="评论内容" rows="3" maxlength="500" placeholder="写下你的评论…"></textarea>' +
          '<button class="评论提交" type="submit">发表评论</button>' +
        "</form>" +
        '<div class="评论列表"></div>' +
      "</div>" +
    "</div>"
  );

  const 互动区 = 正文容器.nextElementSibling;
  const 赞数元素 = 互动区.querySelector(".赞数");
  const 点赞按钮 = 互动区.querySelector(".点赞按钮");
  const 评论表单 = 互动区.querySelector(".评论表单");
  const 评论列表 = 互动区.querySelector(".评论列表");
  const 昵称输入 = 互动区.querySelector(".评论昵称");
  const 内容输入 = 互动区.querySelector(".评论内容");

  /* ---- 点赞：读取 / 增加全局计数 ---- */
  async function 加载点赞数() {
    const { data, error } = await 客户端
      .from("post_likes")
      .select("like_count")
      .eq("post_id", 帖子id)
      .maybeSingle();
    if (data) {
      赞数元素.textContent = data.like_count;
    } else if (!error) {
      await 客户端
        .from("post_likes")
        .insert({ post_id: 帖子id, like_count: 0 });
    }
  }

  点赞按钮.addEventListener("click", async function () {
    const { data } = await 客户端
      .from("post_likes")
      .select("like_count")
      .eq("post_id", 帖子id)
      .maybeSingle();
    let 当前 = data ? data.like_count : 0;
    当前 = 当前 + 1;
    const { error } = await 客户端
      .from("post_likes")
      .upsert({ post_id: 帖子id, like_count: 当前 }, { onConflict: "post_id" });
    if (!error) {
      赞数元素.textContent = 当前;
    }
  });

  /* ---- 评论：加载列表 / 提交评论 ---- */
  async function 加载评论() {
    const { data, error } = await 客户端
      .from("post_comments")
      .select("id, nickname, content, created_at")
      .eq("post_id", 帖子id)
      .order("created_at", { ascending: false });

    if (error) {
      评论列表.innerHTML = '<p class="互动提示">评论加载失败，请刷新重试。</p>';
      return;
    }
    if (!data || data.length === 0) {
      评论列表.innerHTML = '<p class="互动提示">还没有评论，来抢沙发吧。</p>';
      return;
    }

    评论列表.innerHTML = data
      .map(function (评论) {
        return (
          '<div class="评论条目">' +
            '<div class="评论头部">' +
              '<span class="评论昵称">' + 转义文本(评论.nickname) + "</span>" +
              '<span class="评论时间">' + 格式化时间(评论.created_at) + "</span>" +
            "</div>" +
            '<div class="评论正文">' + 转义文本(评论.content) + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  评论表单.addEventListener("submit", async function (事件) {
    事件.preventDefault();
    const 昵称 = 昵称输入.value.trim() || "匿名炉友";
    const 内容 = 内容输入.value.trim();
    if (!内容) {
      alert("评论内容不能为空");
      return;
    }
    const { error } = await 客户端.from("post_comments").insert({
      post_id: 帖子id,
      nickname: 昵称,
      content: 内容
    });
    if (error) {
      alert("评论发布失败：" + error.message);
      return;
    }
    内容输入.value = "";
    加载评论();
  });

  加载点赞数();
  加载评论();
}

/* ================= 公共小工具 ================= */

function 转义文本(文本) {
  return String(文本)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 上传图片到 Supabase Storage（图片限制 2MB）
async function 上传图片(文件, 客户端) {
  const 最大大小 = 2 * 1024 * 1024;
  if (!文件.type.startsWith("image/")) {
    throw new Error("只能上传图片文件（jpg / png）");
  }
  if (文件.size > 最大大小) {
    throw new Error("图片不能超过 2MB，请压缩后再传");
  }
  const 文件名 = "posts/" + Date.now() + "-" + 文件.name.replace(/[^\w.\-]/g, "_");
  const { error } = await 客户端.storage.from("post-images").upload(文件名, 文件);
  if (error) throw error;
  const { data } = 客户端.storage.from("post-images").getPublicUrl(文件名);
  return data.publicUrl;
}

function 格式化时间(时间字符串) {
  const 时间 = new Date(时间字符串);
  const 月 = 时间.getMonth() + 1;
  const 日 = 时间.getDate();
  const 时 = ("0" + 时间.getHours()).slice(-2);
  const 分 = ("0" + 时间.getMinutes()).slice(-2);
  return 月 + "月" + 日 + "日 " + 时 + ":" + 分;
}

/* ================= 页面加载后自动执行 ================= */
渲染帖子列表();
渲染帖子详情();
