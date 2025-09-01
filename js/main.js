const items = document.querySelectorAll(".carousel a");
const classes = ["pos1", "pos2", "pos3", "pos4", "pos5"];

// ✅ 클래스 재배치 함수
function updatePositions() {
  items.forEach((el, i) => {
    el.className = classes[i];
  });
}

// ✅ 오른쪽으로 이동 (자동 슬라이드)
function moveRight() {
  classes.unshift(classes.pop()); // 마지막을 앞으로
  updatePositions();
}

// ✅ 왼쪽으로 이동 (필요시)
function moveLeft() {
  classes.push(classes.shift()); // 첫 번째를 뒤로
  updatePositions();
}

// ✅ 자동 슬라이드 (3초마다 오른쪽 이동)
let autoSlide = setInterval(moveRight, 3000);

// ✅ 마우스 올리면 멈추고, 떼면 다시 실행
const carousel = document.querySelector(".carousel");
carousel.addEventListener("mouseenter", () => clearInterval(autoSlide));
carousel.addEventListener("mouseleave", () => {
  autoSlide = setInterval(moveRight, 3000);
});

// ✅ 카드 클릭 시 해당 카드가 중앙으로 오도록 이동
items.forEach((item, index) => {
  item.addEventListener("click", e => {
    e.preventDefault(); // 상세페이지 이동 막기 (테스트용)

    let centerIndex = [...items].findIndex(el => el.classList.contains("pos3"));

    if (index === centerIndex) {
      // 👉 클릭한 카드가 이미 중앙일 때 → 상세페이지 이동
      window.location.href = item.href;
    } else {
      // 👉 중앙이 아닐 때 → 중앙으로 이동만
      while (index !== centerIndex) {
        moveRight();
        centerIndex = [...items].findIndex(el => el.classList.contains("pos3"));
      }
    }

    // 상세페이지로 이동하려면 이 코드 활성화
    // window.location.href = item.href;
  });
});


const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
        entry.target.classList.remove("hidden");
      }, index * 200); // 0.2초 간격으로 순차 등장
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));