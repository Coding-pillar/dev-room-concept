// import Mux from '@mux/mux-node';
// const mux = new Mux({
//   tokenId: process.env.8c7829dc-209e-4228-a09d-9ff487efa5e3,
//   tokenSecret: process.env.MUX_TOKEN_SECRET
// });

// const manal_1 = await mux.video.assets.retrieve("T02NkfCRKL02vsRWODs024E7CfsIlJeQ7101raMTnQBoJVU");
postSeeds = [
  {
    author: "closedAI",
    handle: "@CA",
    initials: "CA",
    color: "red",
    text: "Just wrapped up a new project that I'm really proud of. Can't wait to share it with you all soon!",
    image: "https://image.mux.com/T02NkfCRKL02vsRWODs024E7CfsIlJeQ7101raMTnQBoJVU/thumbnail.webp",
    video: "VID_20260613_101043549.mp4",
    sound: "original sound - closedAI",
    likes: 328,
    comments: 24
  },
  {
    author: "indie dev",
    handle: "@that one indie dev",
    initials: "ID",
    color: "aqua",
    text: "look at my progress on the new game! still a long way to go but it's coming together :)",
    image: "https://image.mux.com/JDTN6GmQkqrzGrPp2rbSk5n34cwgHnKaTF3n6XuEeyM",
    video: "VID_20260613_163301792.mp4",
    sound: "",
    likes: 211,
    comments: 18
  },
  {
    author: "Big thinker",
    handle: "@BigThinker",
    initials: "BT",
    color: "purple",
    text: "lowkey thinking",
    image: "https://image.mux.com/jc00logSQom01ziSx01sYW5dHM2wCXdFBNRjBxKlz1ILXQ",
    video: "VID_20260613_164455317.mp4",
    sound: "just think",
    likes: 589,
    comments: 61
  },
  {
    author: "Scrub Daddy",
    handle: "@ScrubDaddy",
    initials: "SD",
    color: "yellow",
    text: "Finaly got on SHARK TANK!",
    image: "https://image.mux.com/DOxP01IeZu3AuOXy6iTs6MhZJ6bvREIW9bQeM602OprRk",
    video: "YTDown_Shorts_Scrub-Daddy-in-the-Shark-tank-Shark-Tank_Media_AnzNO7M335s_001_1080p.mp4",
    sound: "",
    likes: 144,
    comments: 9
  }, 
  {
    author: "indie dev",
    handle: "@that one indie dev",
    initials: "ID",
    color: "aqua",
    text: "fell asleeppppppppppppppppppp",
    image: "https://image.mux.com/taoViXYAp00hGxw02tuolDRA89kVA828dmwTbOAB7LUu00",
    video: "VID_20260613_182738503.mp4",
    sound: "snoring",
    likes: 2109,
    comments: 320
  }
];

const feed = document.querySelector("#feed");
const loader = document.querySelector("#loader");

let page = 0;
let loading = false;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function createPost(seed, index, prepend = false) {
  const article = document.createElement("article");
  article.className = "post";
  article.dataset.search = `${seed.author} ${seed.handle} ${seed.text}`.toLowerCase();
  article.innerHTML = `
    <div class="short-media">
      <video class="short-video" src="${seed.video}" poster="${seed.image}"></video>
      <button class="play-badge" type="button" data-action="toggle-video">Pause</button>
      <div class="short-copy">
        <div class="post-header">
          <div class="avatar ${seed.color || ""}">${seed.initials}</div>
          <div>
            <strong>${seed.author}</strong>
            <span>${seed.handle} - ${index % 2 === 0 ? "now" : `${index + 2}h`}</span>
          </div>
        </div>
        <div class="post-body">
          <p>${seed.text}</p>
          <span class="sound-line">${seed.sound || "original sound"}</span>
        </div>
      </div>
      <div class="post-actions">
        <button type="button" data-action="like">
          <span class="action-icon">Like</span>
          <span class="action-count">${seed.likes}</span>
        </button>
        <button type="button" data-action="comment">
          <span class="action-icon">Chat</span>
          <span class="action-count">${seed.comments}</span>
        </button>
        <button type="button" class="invest" data-action="invest">
          <span class="action-icon">Invest</span>

        </button>
      </div>
    </div>
    <form class="comment-box">
      <input type="text" placeholder="Write a comment" />
      <button type="submit">Send</button>
    </form>
  `;

  if (prepend) {
    feed.prepend(article);
  } else {
    feed.insertBefore(article, loader);
  }
}

function loadMorePosts() {
  if (loading) return;
  loading = true;
  loader.textContent = "Loading more posts...";

  const nextPosts = Array.from({ length: 4 }, (_, offset) => {
    const seed = postSeeds[(page * 4 + offset) % postSeeds.length];
    return {
      ...seed,
      likes: seed.likes + page * 17 + offset,
      comments: seed.comments + page + offset
    };
  });

  window.setTimeout(() => {
    const isFirstPage = page === 0;
    nextPosts.forEach((post, offset) => createPost(post, page * 4 + offset));
    page += 1;
    loading = false;
    loader.textContent = "Scroll for more";
    if (isFirstPage) {
      feed.scrollTop = 0;
    }
    playVisibleVideos();
  }, 300);
}

function handleFeedClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const post = button.closest(".post");
  const action = button.dataset.action;

  if (action === "like") {
    const count = button.querySelector(".action-count");
    const liked = button.classList.toggle("liked");
    count.textContent = Number(count.textContent) + (liked ? 1 : -1);
  }

  if (action === "invest") {
    const commentBox = post.querySelector(".comment-box");
    commentBox.classList.toggle("open");
    commentBox.querySelector("input").focus();
    button.classList.toggle("Invested");
    button.querySelector(".action-icon").textContent = button.classList.contains("Invested") ? "Invested" : "Invest";
  }

  if (action === "comment") {
    const commentBox = post.querySelector(".comment-box");
    commentBox.classList.toggle("open");
    commentBox.querySelector("input").focus();
  }

  if (action === "toggle-video") {
    const video = post.querySelector(".short-video");
    if (video.paused) {
      video.play().catch(() => {});
      button.textContent = "Pause";
    } else {
      video.pause();
      button.textContent = "Play";
    }
  }
}

function handleCommentSubmit(event) {
  const form = event.target.closest(".comment-box");
  if (!form) return;

  event.preventDefault();
  const input = form.querySelector("input");
  const commentButton = form.previousElementSibling.querySelector('[data-action="comment"] .action-count');

  if (input.value.trim()) {
    commentButton.textContent = Number(commentButton.textContent) + 1;
    input.value = "";
    form.classList.remove("open");
  }
}

function playVisibleVideos() {
  const feedRect = feed.getBoundingClientRect();
  const videos = [...document.querySelectorAll(".short-video")];

  videos.forEach((video) => {
    const rect = video.closest(".post").getBoundingClientRect();
    const visibleAmount = Math.min(rect.bottom, feedRect.bottom) - Math.max(rect.top, feedRect.top);
    const isMainVideo = visibleAmount > rect.height * 0.45;

    if (isMainVideo) {
      video.play().catch(() => {});
      video.closest(".post").querySelector(".play-badge").textContent = "Pause";
    } else {
      video.pause();
      video.closest(".post").querySelector(".play-badge").textContent = "Play";
    }
  });
}

function handleFeedScroll() {
  playVisibleVideos();

  const loadThreshold = feed.scrollHeight - feed.clientHeight * 2;
  if (feed.scrollTop >= loadThreshold) {
    loadMorePosts();
  }
}

const observer = new IntersectionObserver(
  (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      loadMorePosts();
    }
  },
  { root: feed, rootMargin: "100% 0px" }
);

loadMorePosts();
observer.observe(loader);

feed.addEventListener("click", handleFeedClick);
feed.addEventListener("submit", handleCommentSubmit);
feed.addEventListener("scroll", handleFeedScroll, { passive: true });
