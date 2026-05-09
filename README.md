# Pic Layout

一个纯 H5 的照片排版工具，用于把手机照片按 4R 到 8R 的真实照片规格排到 A2/A3/A4/A5 画布上，并导出高 DPI PNG 给打印机。


## 🚀 运行方式

- **在线直接访问**：打开 [https://orangecrazy.github.io/](https://orangecrazy.github.io/) 即可使用已部署的排版工具。
- **代码仓库 / Issue**：项目源码托管在 [OrangeCrazy/OrangeCrazy.github.io](https://github.com/OrangeCrazy/OrangeCrazy.github.io)，欢迎在仓库中提交 Issue 或改进建议。
- **本地使用**：直接用浏览器打开 [index.html](index.html) 即可运行，不需要安装依赖，也不需要后端服务。
- **局域网部署**：推荐使用 Caddy + Docker 部署在 NAS 或服务器上，方便多设备访问。

## 已实现功能

- 📸 **原图读取**：添加多张本地照片，浏览器直接读取原图，无压缩损失。
- 📄 **多尺寸支持**：支持 A2、A3、A4、A5 通用纸张尺寸。
- 🔄 **灵活排版**：支持旋转画布（横向/纵向），画布预览基于窗口自动缩放，也可在浮动缩放工具栏手动设置比例。
- 🖼️ **自适应界面**：工具栏、画布区和缩放控件自适应排版，内容过多时左侧栏可滚动。
- 🖨️ **高清导出**：导出 DPI 支持 300、600、800、1000、1200，满足专业打印需求。
- 🌍 **多语言**：支持简体中文、繁体中文、英文，自动识别浏览器语言，也可手动切换。
- 🖱️ **右键菜单**：右键单张照片可切换打印尺寸、旋转照片、旋转尺寸、移除照片。
- 🛠️ **侧栏操作**：支持旋转、适配填满、移动照片框、锁定照片位置和移除照片。
- 🧩 **智能排版**：
  - 可手动移动照片裁切框本身；右键菜单可让照片框按边距和间距自动重新排版。
  - 可锁定单张照片的位置、方向和缩放，避免后续自动排版改动它。
  - 自动排版会把后续画布中未锁定的照片向前填补空位。
  - 超大照片保留在边距位置，方便调整。
   - 一次性添加多张照片时，可指定本批照片使用的画布数量，并自动选择照片打印尺寸尽量铺满画布。
- **移动端和桌面端操作**
- 鼠标左键或移动端单指拖动照片内图像，用于选择裁切区域。
- 鼠标滚轮或移动端双指缩放照片，最小缩放会保持照片填满裁切框。
- 移动端长按照片可打开右键菜单。
- ⚙️ **高级设置**：可设置裁切边距、照片间距、出血参考线。
- 📑 **多画布管理**：根据照片数量自动创建多张画布，支持导出当前或全部画布。

## 尺寸参考

### 画布(纸张)尺寸
| 名称 | 尺寸 |
| --- | --- |
| A2 | 420mm x 594mm |
| A3 | 297mm x 420mm |
| A4 | 210mm x 297mm |
| A5 | 148mm x 210mm |

### 照片尺寸
| 名称 | 尺寸 |
| --- | --- |
| 4R | 102mm x 152mm |
| 5R | 127mm x 178mm |
| 6R | 152mm x 203mm |
| 7R | 178mm x 254mm |
| 8R | 203mm x 254mm |

## 🐳 部署到 Linux NAS (推荐方案)

本项目为纯静态网页，推荐使用 **Caddy** 通过 Docker 部署。Caddy 配置简单，且对文件权限兼容性更好。

### 前置准备

1. 确保 NAS 已安装 Docker。
2. 在 NAS 上创建项目目录，例如 `/volume1/docker/pic_layout`。
3. 将 [index.html](index.html), [styles.css](styles.css), [app.js](app.js) 复制到 `/volume1/docker/pic_layout/html` 目录下。
4. 在 `/volume1/docker/pic_layout` 目录下创建 `Caddyfile` 和 `docker-compose.yml`。

### 1. 创建 Caddy 配置文件

新建文件 `Caddyfile` (无后缀)，内容如下：

```caddy
:80 {
    root * /usr/share/caddy
    file_server
    encode gzip
}
```

### 2. 创建 Docker Compose 配置
新建文件 `docker-compose.yml`，内容如下：

```yaml
version: '3'
services:
  pic_layout:
    image: caddy:latest
    container_name: pic_layout
    user: "0:0"  # 以 root 运行，避免挂载卷权限问题
    ports:
      - "9600:80"  # 宿主机端口:容器端口，可修改左侧端口
    volumes:
      - ./html:/usr/share/caddy:ro
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
    restart: unless-stopped
```
### 3. 启动服务

```bash
docker-compose up -d
```

### 4. 访问服务
在局域网浏览器中访问：

```text
http://<NAS_IP>:9600/
```

## 📱 移动设备注意事项
- iPhone、iPad、Android 手机和平板均可直接通过浏览器访问。
- 上传照片和导出 PNG 均在浏览器本地完成，照片不会上传到服务器，保护隐私。
- iOS Safari 可能会将下载的文件保存到“文件”App 的下载目录。
- 如需公网访问，建议配置 HTTPS（Caddy 可自动申请证书，但需绑定域名并开放 443 端口），否则部分浏览器功能可能受限。


## 🌐 发布到互联网

由于项目没有后端，可以发布到任意静态网站托管服务。

### GitHub Pages

当前项目已通过 GitHub Pages 部署，可直接访问：

```text
https://orangecrazy.github.io/
```

对应仓库地址：

```text
https://github.com/OrangeCrazy/OrangeCrazy.github.io
```

1. 新建一个 GitHub 仓库。
2. 上传 [index.html](index.html), [styles.css](styles.css), [app.js](app.js), [README.md](README.md)。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 分支选择 `main` (或 `master`)，目录选择 `/root`。
6. 保存后等待 GitHub 生成访问地址。

### Cloudflare Pages / Netlify / Vercel

这些平台都支持直接部署静态项目：
- 构建命令留空。
- 输出目录填写项目根目录 [/](index.html)。
- 关联 GitHub 仓库或直接拖拽上传项目文件夹即可。

### 公网访问自己的 NAS

可选方案：
- **路由器端口转发**：将外网端口转发到 NAS 的 9600 端口（不推荐，安全性低）。
- **反向代理**：使用 Cloudflare Tunnel、Tailscale Funnel、frp 等工具，配合域名和 HTTPS 证书，实现安全公网访问。

## 🔮 后续迭代建议

- [ ] 增加保存/加载工程文件功能，记录照片布局、缩放和偏移。
- [ ] 优化装箱算法，支持优先旋转、按面积排序、混合尺寸铺满。
- [ ] 增加打印安全区模板，适配具体打印机的不可打印边距。
- [ ] 增加导出选项：带裁切线的预览版 vs 不带裁切线的正式打印版。
