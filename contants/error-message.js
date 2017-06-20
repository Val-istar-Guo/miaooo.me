import * as ERROR from './error-code';

export default {
  [ERROR.TIMEOUT]: {
    title: '连接服务器超时',
    reasons: [
      '检查您的电脑是否联网',
      '在https://github.com/Val-istar-Guo/blog/issues/new网站留言提醒忘记维护的作者',
    ],
  },
  [ERROR.NO_SUCH_ARTICLE]: {
    title: '没有对应的文章',
    reasons: [
      '请确认网址是否输入正确',
      '作者可能无情的删除了这篇文章',
    ],
  },
};

