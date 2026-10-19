
const ROW_HEIGHT = 40;
const BUFFER = 5;
const data = Array.from({ length: 10000 }, (_, i) => `Record ${i + 1}`);

const container = document.getElementById("container"); // height: 400px; overflow-y: auto
const spacer = document.createElement("div");           // creates the full scroll height
const content = document.createElement("div");          // holds visible rows only
spacer.style.height = `${data.length * ROW_HEIGHT}px`;
spacer.style.position = "relative";
content.style.position = "absolute";
content.style.top = "0";
content.style.width = "100%";
spacer.appendChild(content);
container.appendChild(spacer);

function render() {
  const scrollTop = container.scrollTop;
  const visibleCount = Math.ceil(container.clientHeight / ROW_HEIGHT);
  const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
  const end = Math.min(data.length, start + visibleCount + BUFFER * 2);

  const fragment = document.createDocumentFragment();
  for (let i = start; i < end; i++) {
    const row = document.createElement("div");
    row.textContent = data[i];
    row.style.height = `${ROW_HEIGHT}px`;
    fragment.appendChild(row);
  }

  content.style.transform = `translateY(${start * ROW_HEIGHT}px)`;
  content.replaceChildren(fragment);
}

let ticking = false;
container.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      render();
      ticking = false;
    });
    ticking = true;
  }
});

render();