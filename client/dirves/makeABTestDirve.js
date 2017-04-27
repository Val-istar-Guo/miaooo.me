import xs from 'xstream';
import Test from 'v-abtest-test';
import { onTestConfigChange } from 'v-abtest-data';

Test.observe(onTestConfigChange);


export default function (id, defaultConfig) {
  const test = new Test(id);
  test.default(defaultConfig);

  return () => (
    xs.create({
      start(listener) {
        test.update((...arg) => {
          console.log(...arg);
          listener.next(...arg);
        });
      },
      stop() {
        clearInterval(this.id);
      },
      id: 0,
    }));
}
