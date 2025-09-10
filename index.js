let array = [];
const barsContainer = document.getElementById("bars");

function generateArray() {
   let size = parseInt(document.getElementById("arraySize").value);

  // validate input (avoid invalid values)
  if (isNaN(size) || size < 1) size = 1;
  if (size > 30) size = 30;
  array = [];
  barsContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 300) + 20;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    barsContainer.appendChild(bar);
  }
}

async function sortArray() {
  const algo = document.getElementById("algorithm").value;
  if (algo === "bubble") await bubbleSort();
  else if (algo === "selection") await selectionSort();
  else if (algo === "insertion") await insertionSort();
  else if (algo === "merge") await mergeSort(0, array.length - 1);
  else if (algo === "quick") await quickSort(0, array.length - 1);
}

// Helper: swap bars
function swap(i, j) {
  let bars = document.getElementsByClassName("bar");
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  bars[i].style.height = `${array[i]}px`;
  bars[j].style.height = `${array[j]}px`;
}

// Sleep function for animation
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ---------------- BUBBLE SORT ---------------- */
async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = "red";
      bars[j + 1].style.background = "red";
      if (array[j] > array[j + 1]) {
        swap(j, j + 1);
      }
      await sleep(100);
      bars[j].style.background = "cyan";
      bars[j + 1].style.background = "cyan";
    }
  }
}

/* ---------------- SELECTION SORT ---------------- */
async function selectionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = "red";
      if (array[j] < array[min]) min = j;
      await sleep(50);
      bars[j].style.background = "cyan";
    }
    swap(i, min);
  }
}

/* ---------------- INSERTION SORT ---------------- */
async function insertionSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      j--;
      await sleep(50);
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

/* ---------------- MERGE SORT ---------------- */
async function mergeSort(l, r) {
  if (l >= r) return;
  let m = Math.floor((l + r) / 2);
  await mergeSort(l, m);
  await mergeSort(m + 1, r);
  await merge(l, m, r);
}

async function merge(l, m, r) {
  let bars = document.getElementsByClassName("bar");
  let left = array.slice(l, m + 1);
  let right = array.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k] = left[i];
      bars[k].style.height = `${array[k]}px`;
      i++;
    } else {
      array[k] = right[j];
      bars[k].style.height = `${array[k]}px`;
      j++;
    }
    k++;
    await sleep(80);
  }
  while (i < left.length) {
    array[k] = left[i];
    bars[k].style.height = `${array[k]}px`;
    i++; k++;
    await sleep(80);
  }
  while (j < right.length) {
    array[k] = right[j];
    bars[k].style.height = `${array[k]}px`;
    j++; k++;
    await sleep(80);
  }
}

/* ---------------- QUICK SORT ---------------- */
async function quickSort(l, r) {
  if (l < r) {
    let pivot = await partition(l, r);
    await quickSort(l, pivot - 1);
    await quickSort(pivot + 1, r);
  }
}

async function partition(l, r) {
  let bars = document.getElementsByClassName("bar");
  let pivot = array[r];
  let i = l - 1;
  for (let j = l; j < r; j++) {
    bars[j].style.background = "red";
    if (array[j] < pivot) {
      i++;
      swap(i, j);
    }
    await sleep(80);
    bars[j].style.background = "cyan";
  }
  swap(i + 1, r);
  return i + 1;
}

// Generate initial array
generateArray();
