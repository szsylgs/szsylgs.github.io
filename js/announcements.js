/* ============================================================
   深爱炉实馆 · 公告数据文件 announcements.js
   ------------------------------------------------------------
   ★★★ 发布新公告：只需要改这一个文件 ★★★

   操作方法（三步）：
     1. 在下方"公告数据"里，复制一条 { ... }，粘贴到列表最后；
     2. 修改"标题""日期""正文"；
     3. 保存文件，刷新网页即可看到。
   提示：正文里每对引号（"..."）是一段话；想加几段就加几组引号。

   正文段落支持的特殊写法：
     - 图片：  "![说明文字](images/图片名.jpg)"
     - 居中：  "## 这一行居中"
     - 右对齐：">> 这一行右对齐"
     其他普通文字默认靠左。
   下面的"渲染部分"一般不用动。
   ============================================================ */

/* ============================================================
   ★★ 互动功能配置（评论 / 点赞）：使用前必须填写 ★★
   ------------------------------------------------------------
   1. 打开 https://supabase.com 注册并登录，点 New project 创建项目；
   2. 在项目左侧菜单 Settings → API，找到并复制：
        - Project URL（形如 https://xxxx.supabase.co）
        - anon public key（一长串以 eyJ 开头的字符串）
   3. 把下面两处引号里的内容替换成你自己的；
   4. 到 SQL Editor 执行《使用说明》里"建表语句"一节的 SQL（必须，否则报错）。
   不想用互动功能时，保持下面两行原样不动即可，页面会自动隐藏互动区。
   ============================================================ */
const SUPABASE_URL = "https://lltbwxfmhwglvjibbsdy.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CE86zWZRvs-lOXIT9Kz8TA_Yc8-u-ZQ";

/* ================= 公告数据（在这里添加 / 修改公告） ================= */
const 公告列表 = [

   {
    id: 5,
    标题: "老子天下第一",
    日期: "2026-09-16",
    正文: [
       "![](images/1284.jpg)"
    ]
  },
   {
    id: 4,
    标题: "分享图片",
    日期: "2026-09-16",
    正文: [
      "分享图片",
       "![](images/mkq.jpg)"
    ]
  },
   {
    id: 3,
    标题: "炉管之道",
    日期: "2026-09-16",
    正文: [
      "炉管是一件很有意思的东西。它看起来不过是一段中空的金属，却要在炉膛中承受高温、压力与长时间的反复运行。它的材料、壁厚、弯曲程度、排列方式，都需要经过精确计算；太薄，承受不了压力，太厚，又会影响传热。于是，一根炉管真正的价值，并不只在于“能用”，而在于它能不能在复杂的条件下保持稳定。",
      "而炉管最值得谈的，始终是温度。火焰赋予它热量，也考验它的极限。升温不能急，降温不能骤，热胀冷缩之间需要留下足够的余量。好的炉管不是一味追求更高的温度，而是懂得控制火候：什么时候该热，什么时候该缓；什么时候继续承受，什么时候停下来调整。工艺的精妙，往往就在这点“度”里。",
       "也因此，我们喜欢炉管身上的那股“工”劲儿。没有人会因为一根管子藏在炉膛里，就允许它少一毫米的精度；也没有人会因为同一个动作已经做过无数遍，就觉得检查可以省略。反复、耐心、克制，把每一个细节做到可靠——所谓工艺精神，大概就是把热情变成习惯，把习惯变成标准。",
      "至于“炉管”这个名字，本身似乎也有些耐人寻味。炉管，念得快一点，便容易让人产生某种心照不宣的联想。它既可以是炉膛里承受热量的管道，也可以让人在独处的时候想到一些不必拿出来认真讨论的事情。毕竟，人总需要找到自己的方式释放压力，调节温度；只要有分寸、有节制，偶尔让自己放松下来，也没什么不好。说到底，炉管讲究的是火候，人也讲究的是尺度。",
       "所以我们谈炉管，不只是谈一根管子如何经受高温，也是在谈一种做事的态度：有热情，却不失控；肯投入，也懂得收放；愿意反复打磨，也接受偶尔停下来喘口气。",
       "炉火可以很旺，管壁依然要稳。",
       "而我们，也该如此。",
       "炉管有炉管的温度，炉管社有炉管社的精神。",
       ">> 作者：炉管社成员"
    ]
  },
  {
    id: 2,
    标题: "深圳实验炉管社 | 开馆新语",
    日期: "2026-09-15",
    正文: [
       "![](images/640.jpg)",
      "各位同学大家好！",
      "今天，“深爱炉实馆”公众号正式和大家见面了。",
      "这是一方属于我们的园地，以炉喻磨砺，以馆为聚点。在这里，我们可以畅谈所思、共研所学，和一群心怀热忱的同路人彼此交流、相互砥砺。",
       "凡成大事者，必经淬炼。就像烈火锻冶金石，少年人的志向，也要在日复一日的思考与实践中打磨成型。不必畏惧前路的难题与坎坷，有志同道合的伙伴并肩同行，便有勇气去探寻真理、奔赴目标。",
       "新篇已启，静候诸君。愿我们在此相会，坚守本心，求索不止，一起在求知路上踏浪前行。",
       "有诗为证：",
       "## 深聚英贤启此坛，爱承远志破重关。",
       "## 炉熔百炼锋芒出，管领新潮待俊攀。",
       "## 胸抱星辰寻至理，心怀浩气历千艰。",
       "## 今朝同踏青云路，共写鸿篇耀宇寰。",
       ">> 炉管社副社长"
    ]
  },
  {
    id: 1,
    标题: "深圳实验炉管社正式建立",
    日期: "2026-07-27",
    正文: [
      "亲爱的各位炉友：",
      "深爱炉实馆于 2026 年 7 月 27 日正式开业，欢迎各位炉友前来进行炉管体验！",
      "我们致力于给每位成员最舒适的炉管体验，有意者请加入炉管社群聊或关注“深爱炉实馆”公众号咨询！",
      "深圳实验炉管社"
    ]
  }
];

/* ================= 渲染部分（一般不用动） ================= */

/*
 * 渲染公告列表：首页（只显示前几条）和公告列表页（显示全部）共用。
 * 在 HTML 里给容器加 data-数量="3" 就只显示 3 条，不加则全部显示。
 */
function 渲染公告列表() {
  const 容器 = document.getElementById("公告列表");
  if (!容器) return;

  const 数量 = 容器.dataset.数量 ? parseInt(容器.dataset.数量, 10) : 公告列表.length;
  const 前几条 = 公告列表.slice(0, 数量);

  容器.innerHTML = 前几条
    .map(function (公告) {
      return (
        '<a class="公告卡片" href="news-detail.html?id=' + 公告.id + '">' +
          '<span class="公告日期">' + 公告.日期 + "</span>" +
          '<span class="公告标题">' + 公告.标题 + "</span>" +
          '<span class="箭头">→</span>' +
        "</a>"
      );
    })
    .join("");

  // 没有公告时给一句提示
  if (前几条.length === 0) {
    容器.innerHTML = '<p style="color:var(--浅文字)">暂无公告，敬请期待。</p>';
  }
}

/*
 * 渲染公告详情：公告详情页（news-detail.html）使用。
 * 根据网址里的 ?id=1 找到对应公告并显示标题、日期、正文。
 */
function 渲染公告详情() {
  const 容器 = document.getElementById("公告正文");
  if (!容器) return;

  const 参数 = new URLSearchParams(window.location.search);
  const id = parseInt(参数.get("id"), 10) || 1;
  const 公告 = 公告列表.find(function (a) { return a.id === id; });

  if (!公告) {
    document.getElementById("公告标题").textContent = "未找到该公告";
    document.getElementById("公告日期").textContent = "";
    容器.innerHTML = "<p>这条公告可能已被删除，请返回公告列表查看其他公告。</p>";
    return;
  }

  document.getElementById("公告标题").textContent = 公告.标题;
  document.getElementById("公告日期").textContent = "发布于 " + 公告.日期;
   document.title = 公告.标题 + " - 公告详情 - 深爱炉实馆";

  // 正文渲染：支持图片、居中、右对齐。
  容器.innerHTML = 公告.正文
    .map(function (段落) {
      // 图片：![说明文字](images/图片名.jpg)
      var 图片 = 段落.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (图片) {
        return '<p class="公告配图"><img src="' + 图片[2] + '" alt="' + 图片[1] + '"></p>';
      }
      // 居中：## 这一行居中
      var 居中文本 = 段落.match(/^##\s*(.+)$/);
      if (居中文本) {
        return '<p class="公告居中">' + 居中文本[1] + "</p>";
      }
      // 右对齐：>> 这一行右对齐
      var 右对齐文本 = 段落.match(/^>>\s*(.+)$/);
      if (右对齐文本) {
        return '<p class="公告右对齐">' + 右对齐文本[1] + "</p>";
      }
      // 普通段落（默认靠左）
      return "<p>" + 段落 + "</p>";
    })
    .join("");
   
   // ===== 互动区：无限制点赞 + 匿名评论（依赖 Supabase 配置） =====
  渲染互动区(容器, id);
}

/* ================= 互动区（点赞 + 匿名评论） ================= */

/*
 * 渲染点赞区和评论区。数据保存在 Supabase 云端，所有访客共享。
 * 如果上方 SUPABASE_URL 未填写，则不显示互动区（不影响其他功能）。
 */
function 渲染互动区(正文容器, 公告id) {
  // 未配置 Supabase 时直接跳过
  if (!SUPABASE_URL || SUPABASE_URL.indexOf("你的项目") !== -1) {
    return;
  }

  const 客户端 = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 在公告正文后面插入互动区
  正文容器.insertAdjacentHTML(
    "afterend",
    '<div class="互动区">' +
      '<div class="点赞区">' +
        '<button class="点赞按钮" type="button">赞 <span class="赞数">0</span></button>' +
        '<div class="点赞提示">喜欢就疯狂点赞吧</div>' +
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
      .from("announcement_likes")
      .select("like_count")
      .eq("announcement_id", 公告id)
      .maybeSingle();
    if (data) {
      赞数元素.textContent = data.like_count;
    } else if (!error) {
      // 首次访问：先建一条 0 赞记录
      await 客户端
        .from("announcement_likes")
        .insert({ announcement_id: 公告id, like_count: 0 });
    }
  }

  点赞按钮.addEventListener("click", async function () {
    const { data } = await 客户端
      .from("announcement_likes")
      .select("like_count")
      .eq("announcement_id", 公告id)
      .maybeSingle();
    let 当前 = data ? data.like_count : 0;
    当前 = 当前 + 1;
    const { error } = await 客户端
      .from("announcement_likes")
      .upsert({ announcement_id: 公告id, like_count: 当前 }, { onConflict: "announcement_id" });
    if (!error) {
      赞数元素.textContent = 当前;
    }
  });

  /* ---- 评论：加载列表 / 提交评论 ---- */
  function 转义(文本) {
    return String(文本)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function 格式化时间(时间字符串) {
    const 时间 = new Date(时间字符串);
    const 月 = 时间.getMonth() + 1;
    const 日 = 时间.getDate();
    const 时 = ("0" + 时间.getHours()).slice(-2);
    const 分 = ("0" + 时间.getMinutes()).slice(-2);
    return 月 + "月" + 日 + "日 " + 时 + ":" + 分;
  }

  async function 加载评论() {
    const { data, error } = await 客户端
      .from("announcement_comments")
      .select("id, nickname, content, created_at")
      .eq("announcement_id", 公告id)
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
              '<span class="评论昵称">' + 转义(评论.nickname) + "</span>" +
              '<span class="评论时间">' + 格式化时间(评论.created_at) + "</span>" +
            "</div>" +
            '<div class="评论正文">' + 转义(评论.content) + "</div>" +
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
    const { error } = await 客户端.from("announcement_comments").insert({
      announcement_id: 公告id,
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

/* ================= 页面加载后自动执行 ================= */
渲染公告列表();
渲染公告详情();
