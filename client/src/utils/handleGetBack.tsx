export default function handleGetBack(e) {
  e.preventDefault()
  window && window.history.back();
};
