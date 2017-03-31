import xs from 'xstream';

export default function (start = 0) {
  let num = start;

  return () => (
    xs.create({
      start(listener) {
        this.id = setInterval(() => {
          num += 1;
          listener.next(`num: ${num}`);
        }, 1000);
      },
      stop() {
        clearInterval(this.id);
      },
      id: 0,
    }));
}
