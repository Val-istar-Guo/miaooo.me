import { h2, p, a, pre, code, ol, li, blockquote } from '@cycle/dom';

export default [
  {
    id: 1,
    title: 'git为何会忽略icon文件（夹）',
    des: '在mac系统中，究竟为何git会全局忽略icon文件（夹）。即使没有配置全局ignore',
    content: [
      p('在mac系统下使用git add 的时候，是否你有过被提示“icon文件夹被忽略”。'),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git add icon\nThe following paths are ignored by one of your .gitignore files:\nicon')),

      p('此时，即便换一个项目，创建的icon文件夹依然会被git忽略。但是<code>.gitignore</code>内并没有添加有关忽略icon文件夹相关的内容。同时，也并没有主动的配置过全局忽略。如果你也想一探究竟，这篇文章或许能节约你很多时间。'),

      h2('寻找问题源头'),

      p('尝试几次后，发现一个不常见的命令<code>git check-ignore -v &lt;path&gt;</code>命令，可以用来来查找忽略文件的源头'),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git check-ignore -v icon\n/Users/quessir/.config/git/ignore:9:Icon icon')),

      p('打开列出的文件'),

      pre(code('# Automatically created by GitHub for Mac\n# To make edits, delete these initial comments, or else your changes may be lost!\n\n*.DS_Store\n\n.AppleDouble\n\n.LSOverride\n\n\n\n# Icon must end with two \r\n\nIcon\n\n# Thumbnails\n\n._*\n\n\n\n# Files that might appear in the root of a volume\n\n.DocumentRevisions-V100\n\n.fseventsd\n\n.Spotlight-V100\n\n.TemporaryItems\n\n.Trashes\n\n.VolumeIcon.icns\n\n.com.apple.timemachine.donotpresent\n\n\n\n# Directories potentially created on remote AFP share\n\n.AppleDB\n\n.AppleDesktop\n\nNetwork Trash Folder\n\nTemporary Items\n\n.apdisk\n')),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git check-ignore -v icon\n/Users/quessir/.config/git/ignore:9:Icon  icon')),

      p(['从说明中得知，文件是由github为mac安装的，然而...我并不知情。为何是GitHub安装的呢，我猜是由于安装了', a({ attrs: { href: 'https://desktop.github.com/' } }, 'GitHub Desktop app'), '。']),

      p('详细看了文件内容会发现作怪的一句'),

      pre(code('# Icon must end with two \r\nIcon\n')),

      p('找到了作怪的地方，但删除并非明智之举，因为github不会无端写这么一句话。'),

      h2('忽略Icon的真正原因是什么呢？'),

      p('经过查证，当用户修改文件夹图标时，会在文件夹下创建一个名为<code>Icon\r</code>的文件。我们来尝试一下：'),

      ol([
        li(['修改文件夹图标', a({ attrs: { href: 'https://support.apple.com/kb/PH13922?locale=zh_CN&amp;viewlocale=zh_CN' } }, '操作指南')]),
        li(p('查看文件夹下内容')),
      ]),

      p('这里插播一段网上回答解释<code>Icon?</code>为何带有小尾巴&#39;?&#39;：'),

      blockquote(p('It&#39;s name is actually Icon\r, with \r being the carriage return 0x0D. If letting the shell autocomplete the path in Terminal, it yields Icon\n, \n being \r.')),

      h2('总结'),

      p('其实Github安装的这段配置同时也是很多人自己配置git全局忽略的模板。因此，最好的解决方案就是将icon文件夹更名，避免项目在别人的电脑上出现相似的问题。'),

      p('至此，终于真相大白。回头来想，达成这个成就需要以下几点。'),

      ol([
        li('安装了GitHub Desktop（他并不主动告知你安装了这段内容）'),
        li('自己没有用相似的模板设置git全局ignore'),
        li('文件夹以<code>icon</code>命名'),
        li('我的系统磁盘格式是 Mac OS (扩展 日志式 忽略大小写) 或许也有关系，由于文件命名是不区分大小写的。'),
      ]),

      p('解锁成就有点复杂，或许这也是google不到原因吧。分享给大家，注意GitHub Desktop app给埋下的坑。（似乎他以为他是为了我好）'),
    ],
  },
  {
    id: 2,
    title: 'Minecraft 钓鱼机制作',
    des: '如何在 minecraft 中制作钓鱼机',
    content: [
      p('在mac系统下使用git add 的时候，是否你有过被提示“icon文件夹被忽略”。'),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git add icon\nThe following paths are ignored by one of your .gitignore files:\nicon')),

      p('此时，即便换一个项目，创建的icon文件夹依然会被git忽略。但是<code>.gitignore</code>内并没有添加有关忽略icon文件夹相关的内容。同时，也并没有主动的配置过全局忽略。如果你也想一探究竟，这篇文章或许能节约你很多时间。'),

      h2('寻找问题源头'),

      p('尝试几次后，发现一个不常见的命令<code>git check-ignore -v &lt;path&gt;</code>命令，可以用来来查找忽略文件的源头'),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git check-ignore -v icon\n/Users/quessir/.config/git/ignore:9:Icon icon')),

      p('打开列出的文件'),

      pre(code('# Automatically created by GitHub for Mac\n# To make edits, delete these initial comments, or else your changes may be lost!\n\n*.DS_Store\n\n.AppleDouble\n\n.LSOverride\n\n\n\n# Icon must end with two \r\n\nIcon\n\n# Thumbnails\n\n._*\n\n\n\n# Files that might appear in the root of a volume\n\n.DocumentRevisions-V100\n\n.fseventsd\n\n.Spotlight-V100\n\n.TemporaryItems\n\n.Trashes\n\n.VolumeIcon.icns\n\n.com.apple.timemachine.donotpresent\n\n\n\n# Directories potentially created on remote AFP share\n\n.AppleDB\n\n.AppleDesktop\n\nNetwork Trash Folder\n\nTemporary Items\n\n.apdisk\n')),

      pre(code('&gt; [Val.istar.Guo@BlogArticle]$ git check-ignore -v icon\n/Users/quessir/.config/git/ignore:9:Icon  icon')),

      p(['从说明中得知，文件是由github为mac安装的，然而...我并不知情。为何是GitHub安装的呢，我猜是由于安装了', a({ attrs: { href: 'https://desktop.github.com/' } }, 'GitHub Desktop app'), '。']),

      p('详细看了文件内容会发现作怪的一句'),

      pre(code('# Icon must end with two \r\nIcon\n')),

      p('找到了作怪的地方，但删除并非明智之举，因为github不会无端写这么一句话。'),

      h2('忽略Icon的真正原因是什么呢？'),

      p('经过查证，当用户修改文件夹图标时，会在文件夹下创建一个名为<code>Icon\r</code>的文件。我们来尝试一下：'),

      ol([
        li(['修改文件夹图标', a({ attrs: { href: 'https://support.apple.com/kb/PH13922?locale=zh_CN&amp;viewlocale=zh_CN' } }, '操作指南')]),
        li(p('查看文件夹下内容')),
      ]),

      p('这里插播一段网上回答解释<code>Icon?</code>为何带有小尾巴&#39;?&#39;：'),

      blockquote(p('It&#39;s name is actually Icon\r, with \r being the carriage return 0x0D. If letting the shell autocomplete the path in Terminal, it yields Icon\n, \n being \r.')),

      h2('总结'),

      p('其实Github安装的这段配置同时也是很多人自己配置git全局忽略的模板。因此，最好的解决方案就是将icon文件夹更名，避免项目在别人的电脑上出现相似的问题。'),

      p('至此，终于真相大白。回头来想，达成这个成就需要以下几点。'),

      ol([
        li('安装了GitHub Desktop（他并不主动告知你安装了这段内容）'),
        li('自己没有用相似的模板设置git全局ignore'),
        li('文件夹以<code>icon</code>命名'),
        li('我的系统磁盘格式是 Mac OS (扩展 日志式 忽略大小写) 或许也有关系，由于文件命名是不区分大小写的。'),
      ]),

      p('解锁成就有点复杂，或许这也是google不到原因吧。分享给大家，注意GitHub Desktop app给埋下的坑。（似乎他以为他是为了我好）'),
    ],
  },
];
