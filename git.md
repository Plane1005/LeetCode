**git上传代码常用命令**

git命令速查
https://gitee.com/all-about-git  [git命令速查](https://gitee.com/all-about-git)

git init
初始化
git add README.md
添加文件
git commit -m "备注"
上传到本地仓库
git remote add origin git@github.com:Plane1005/test.git
连接到远程仓库
git branch -M main
链接main仓库
git push -u origin main
将本地仓库代码上传到远程仓库
git remote -v
查看远程仓库信息
git pull origin main
上面命令表示，取回 origin/master 分支，再与本地分支合并
如果遇到

```bash
error: failed to push some refs to 'github.com:Plane1005/WEB-LY.git'
```
说明问题是本地仓库与远程仓库不一致，也就是说我们需要先将远程代码库中的任何文件先pull到本地代码库中，才能push新的代码到github代码库中，所以执行

```bash
git pull --rebase origin webhomework
```
接着再push就好了

git结构
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210522202217897.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ4NDc0NTg1,size_16,color_FFFFFF,t_70)

git忽略文件

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021052220224798.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ4NDc0NTg1,size_16,color_FFFFFF,t_70)



**问题**
在上传代码到github仓库时，想删除远程仓库里的文件，结果误操作，将本地的代码文件删除，已经rm和commit，本地和远程仓库都已经删除，且使用git status时，也显示
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210518121310268.png)

回收站也无法找到。

**解决**
使用命令

```bash
git log --diff-filter=D --summary
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210518121358445.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ4NDc0NTg1,size_16,color_FFFFFF,t_70)
在类似日志的系统里找到了被删除的文件
接下来使用

```bash
git checkout 6a7d43ed43ee3fb79f4e549b68feebafddd9954a~1  'css'
```
长串的字符串是日志里的commit后的字符串，后面再加上~1
接着每个恢复就好了
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210518121542612.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ4NDc0NTg1,size_16,color_FFFFFF,t_70)
最后status发现已经恢复数据

参考博客：https://blog.csdn.net/debimeng/article/details/98471666?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-1&spm=1001.2101.3001.4242
