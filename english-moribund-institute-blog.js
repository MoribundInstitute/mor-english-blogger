// Constants
const siteUrl = "https://englishmoribundinstitute.blogspot.com/";
const blogId = "484911786529551156";
const blogTitle = "English Moribund Institute";
const titleSeparator = "<title><data:blog.title/></title>";

// Defer.js library (version 2.5.0)
!function(r,i,t){var u,o=/^data-(.+)/,a='IntersectionObserver',c=/p/.test(i.readyState),s=[],f=s.slice,l='deferjs',n='load',e='pageshow',d='forEach',h='shift';function m(e){i.head.appendChild(e)}function v(e,n){f.call(e.attributes)[d](n)}function p(e,n,t,o){return o=(o=n?i.getElementById(n):o)||i.createElement(e),n&&(o.id=n),t&&(o.onload=t),o}function y(e,n){return f.call((n||i).querySelectorAll(e))}function b(t,e){y('source',t)[d](b),v(t,function(e,n){(n=o.exec(e.name))&&(t[n[1]]=e.value)}),e&&(t.className+=' '+e),n in t&&t[n]()}function I(e){u(function(o){o=y(e||'[type=deferjs]'),function e(n,t){(n=o[h]())&&(n.parentNode.removeChild(n),(t=p(n.nodeName)).text=n.text,v(n,function(e){'type'!=e.name&&t.setAttribute(e.name,e.value)}),t.src&&!t.hasAttribute('async')?(t.onload=t.onerror=e,m(t)):(m(t),e()))}()})}(u=function(e,n){c?t(e,n):s.push(e,n)}).all=I,u.js=function(n,t,e,o){u(function(e){(e=p('SCRIPT',t,o)).src=n,m(e)},e)},u.css=function(n,t,e,o){u(function(e){(e=p('LINK',t,o)).rel='stylesheet',e.href=n,m(e)},e)},u.dom=function(e,n,t,z,o,i){function c(e){o&&!1===o(e)||b(e,t)}u(function(t){t=a in r&&new r[a](function(e){e[d](function(e,n){e.isIntersecting&&(n=e.target)&&(z&&z(n),t.unobserve(n),c(n))})},i),y(e||'[data-src]')[d](function(e){l in e||(e[l]=1,t?t.observe(e):c(e))})},n)},u.reveal=b,r.Defer=u,r.addEventListener('on'+e in r?e:n,function(){for(I();s[0];t(s[h](),s[h]()))c=1})}(this,document,setTimeout);
'IntersectionObserver'in window||document.write('<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"><\/script>');

// Utility functions
function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function loadScript(src, id, callback) {
  const script = document.createElement('script');
  script.src = src;
  if (id) script.id = id;
  script.onload = callback;
  document.head.appendChild(script);
}

// Template functions
function relatedPostsTemplate(data) {
  return `
    ${data.title ? `<div class='widget-title position-relative mb-3 text-uppercase fw-light'><span>${data.title}</span></div>` : ""}
    <div class='row row-cols-sm-2'>
      ${data.posts.map(post => `
        <article class='mb-4'>
          <div class='h-100 overflow-hidden rounded position-relative border border-light bg-archive shadow-sm'>
            ${post.img ? `
              <div class='item-thumbnail'>
                <a class='bg-light d-block ratio ratio-21x9' href='${post.url}'>
                  <img alt='${post.title}' class='object-cover lazy-${post.grup_id} lazyload' data-src='${post.img}' loading='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='/>
                </a>
              </div>
            ` : ""}
            <div class='item-content p-4'>
              <h2 class='item-title fs-6 mb-2' itemprop='headline'>
                <a class='text-reset' href='${post.url}'>${post.title}</a>
              </h2>
              <div class='item-meta text-secondary d-flex flex-wrap fw-light'>
                ${post.author !== "Unknown" ? `
                  <small class='me-2'>
                    <svg aria-hidden='true' class='me-1 icon'><use xlink:href='#i-user'/></svg>${post.author}
                  </small>
                ` : ""}
                <small class='me-2'>
                  <svg aria-hidden='true' class='me-1 icon'><use xlink:href='#i-clock'/></svg>${post.date}
                </small>
              </div>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

function sitemapTemplate(data) {
  return `
    <div class='accordion'>
      ${data.categories.map((category, index) => `
        <div class='accordion-item'>
          <input ${index === 0 ? "checked" : ""} id='sitemap-list-${index}' name='sitemap' type='radio' class='d-none'/>
          <label for='sitemap-list-${index}' class='accordion-header accordion-button collapsed'>${category.term}</label>
          <div class='accordion-collapse collapse border-top border-light d-block-check'>
            <div class='accordion-body'>
              <div class='sitemap-list' data-label='${category.term}' data-func='sitemap_list_temp' data-items='9999'>
                <div class='text-center'>
                  <div class='spinner-grow text-light' role='status'>
                    <span class='visually-hidden'>Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function sitemapListTemplate(data) {
  return `
    <ul class='list-unstyled fs-7'>
      ${data.posts.map(post => `
        <li class='mb-2'><a href='${post.url}'>${post.title}</a></li>
      `).join("")}
    </ul>
  `;
}

function relatedInlineTemplate(data) {
  return `
    <div class='px-3 py-2 mb-4 border border-3 border-light rounded'>
      ${data.title ? `<div class='fw-light pb-3'><span>${data.title}</span></div>` : ""}
      <ul class='ps-3 fw-bold'>
        ${data.posts.map(post => `
          <li class='mb-2'><a href='${post.url}'>${post.title}</a></li>
        `).join("")}
      </ul>
    </div>
  `;
}

function sidebarTemplate(data) {
  return `
    ${data.title ? `<div class='widget-title position-relative fs-6 mb-3'><span>${data.title}</span></div>` : ""}
    <div class='mb-4'>
      ${data.posts.map(post => `
        <div class='item-post d-flex mb-3'>
          ${post.img ? `
            <div class='item-thumbnail me-3' style='width:85px'>
              <a class='rounded bg-light overflow-hidden d-block ratio ratio-1x1' href='${post.url}'>
                <img alt='${post.title}' class='object-cover lazy-${post.grup_id} lazyload' data-src='${post.img}' loading='lazy' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='/>
              </a>
            </div>
          ` : ""}
          <div class='item-content col'>
            <h3 class='item-title fs-7 mb-2' itemprop='headline'>
              <a class='text-reset' href='${post.url}'>${post.title}</a>
            </h3>
            <div class='item-meta text-secondary d-flex flex-wrap fs-8'>
              <small class='me-2'>
                <svg aria-hidden='true' class='me-1 icon'><use xlink:href='#i-clock'/></svg>${post.date}
              </small>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

// Custom post loading function
const loadCustomPosts = (element) => {
  const grupId = Math.random().toString(36).substring(7);
  const label = element.getAttribute('data-label');
  const items = element.getAttribute('data-items') || 6;
  const title = element.getAttribute('data-title') || '';
  const shuffle = element.getAttribute('data-shuffle');
  const noItem = element.getAttribute('data-no-item');
  const func = element.getAttribute('data-func');
  const callback = element.getAttribute('data-callback');

  const maxResults = noItem ? parseInt(items) + 1 : items;
  const labelParam = label ? `-/${encodeURIComponent(label.trim())}/` : '';

  fetch(`${siteUrl}/feeds/posts/summary/${labelParam}?alt=json&max-results=${maxResults}`)
    .then(response => response.json())
    .then(data => {
      const totalResults = parseInt(data.feed.openSearch$totalResults.$t);
      if (totalResults > 0) {
        const posts = data.feed.entry.map(entry => ({
          grup_id: grupId,
          url: entry.link[entry.link.length - 1].href,
          title: entry.title.$t,
          summary: entry.summary.$t.trim(),
          img: entry.media$thumbnail && entry.media$thumbnail.url,
          author: entry.author[0].name.$t,
          comment: entry.thr$total && entry.thr$total.$t,
          label: entry.category,
          published: new Date(entry.published.$t)
        }));

        if (shuffle) {
          posts.sort(() => 0.5 - Math.random());
        }

        const templateData = {
          title: title,
          posts: posts.slice(0, items)
        };

        const templateFunc = window[func];
        if (typeof templateFunc === 'function') {
          element.innerHTML = templateFunc(templateData);
          element.classList.remove('visually-hidden');

          // Lazy load images
          Defer.dom('.lazy-' + grupId, 1, 'loaded', loadImage);

          // Execute callback if exists
          if (callback && typeof window[callback] === 'function') {
            window[callback]();
          }
        }
      }
    });
};

// Image lazy loading function
const loadImage = (img) => {
  const src = img.getAttribute('data-src');
  if (src) {
    if (src.match(/(bp.blogspot|googleusercontent)/)) {
      const width = (img.width * (window.devicePixelRatio > 1 ? 2 : 1)).toFixed(0);
      const height = (img.height * (window.devicePixelRatio > 1 ? 2 : 1)).toFixed(0);
      const parent = img.parentElement;
      const parentWidth = (parent.offsetWidth * (window.devicePixelRatio > 1 ? 2 : 1)).toFixed(0);

      let newSrc;
      if (parent.classList.contains('ratio')) {
        newSrc = src.replace(/\/s\d+(\-c)?\//, '/w' + width + '-h' + height + '-c/');
      } else {
        newSrc = src.replace(/\/s\d+(\-c)?\//, '/s' + (width < 30 ? (parentWidth < 30 ? parent.parentElement.offsetWidth : parentWidth) : width) + '/');
      }

      img.src = newSrc;
    } else if (src.match(/(img.youtube|i.ytimg)/)) {
      img.src = src.substr(0, src.lastIndexOf('/')) + '/mqdefault.jpg';
    } else {
      img.src = src;
    }
  }
};

// Main initialization function
function initBlog() {
  // Implement lazy loading
  Defer.dom('.lazyload', 100, 'loaded', loadImage);

  // Initialize custom post loading
  const customPostElements = document.querySelectorAll('[data-label]');
  customPostElements.forEach(loadCustomPosts);

  // Initialize sitemap
  const sitemapContainer = document.querySelector('.sitemap-container');
  if (sitemapContainer) {
    fetch(`${siteUrl}/feeds/posts/summary?alt=json&max-results=0`)
      .then(response => response.json())
      .then(data => {
        const categories = data.feed.category.map(cat => ({ term: cat.term }));
        sitemapContainer.innerHTML = sitemapTemplate({ categories });
        initializeSitemap();
      });
  }

  // Add event listeners
  const searchToggle = document.getElementById('search-toggle');
  const searchHeader = document.getElementById('search-header');
  const navbarToggle = document.getElementById('navbar-toggle');
  const navbar = document.getElementById('navbar');
  const commentButton = document.getElementById('comment-button');
  const threadedCommentForm = document.getElementById('threaded-comment-form');

  if (searchToggle && searchHeader) {
    searchToggle.addEventListener('change', () => {
      searchHeader.classList.toggle('show', searchToggle.checked);
      if (searchToggle.checked) {
        setTimeout(() => {
          document.getElementById('search-input').focus();
        }, 100);
      }
    });
  }

  if (navbarToggle && navbar) {
    navbarToggle.addEventListener('change', () => {
      navbar.classList.toggle('show', navbarToggle.checked);
    });
  }

  if (commentButton && threadedCommentForm) {
    commentButton.addEventListener('click', (e) => {
      e.preventDefault();
      threadedCommentForm.classList.remove('d-none');
      const addCommentContainer = document.getElementById('add-comment');
      if (addCommentContainer) {
        addCommentContainer.appendChild(threadedCommentForm);
      }
    });
  }

  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
window.addEventListener('scroll', () => {
  backToTopButton.classList.toggle('d-none', window.pageYOffset < 1000);
});
backToTopButton.addEventListener('click', (e) => {
e.preventDefault();
window.scrollTo({ top: 0, behavior: 'smooth' });
});
}
}
// Helper function to initialize sitemap
function initializeSitemap() {
const sitemapLists = document.querySelectorAll('.sitemap-list');
sitemapLists.forEach(list => {
const label = list.getAttribute('data-label');
fetch(`${siteUrl}/feeds/posts/summary/-/${encodeURIComponent(label)}?alt=json&max-results=9999`)
.then(response => response.json())
.then(data => {
const posts = data.feed.entry.map(entry => ({
url: entry.link[entry.link.length - 1].href,
title: entry.title.$t
}));
list.innerHTML = sitemapListTemplate({ posts });
});
});
}
// Run initialization when the DOM is ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', initBlog);
} else {
initBlog();
}
