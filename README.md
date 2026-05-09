# Pic Layout

一个照片排版工具，用于把手机照片按 4R 到 8R 的真实照片规格排到 A2/A3/A4/A5 画布上，并导出高 DPI PNG 给打印机。

## 运行方式

直接用浏览器打开 `index.html` 即可运行，不需要安装依赖，也不需要后端服务。

## 已实现功能

- 添加多张本地照片，浏览器直接读取原图。
- 支持 A2、A3、A4、A5 通用纸张尺寸。
- 支持旋转画布，用横向或纵向纸张排版。
- 画布预览会基于浏览器窗口自动缩放，也可以在右下角手动设置缩放比例。
- 工具栏、画布区和缩放控件会在浏览器窗口内自适应排版，工具栏内容较多时可在左侧栏内滚动。
- 导出 DPI 支持 300、600、800、1000、1200。
- 支持简体中文、繁体中文、英文，会自动识别浏览器语言，也可以在顶部手动切换。
- 支持 4R、5R、6R、7R、8R 固定照片规格。
- 右键单张照片可切换打印尺寸、旋转照片、旋转尺寸。
- 侧栏可旋转照片、旋转尺寸、适配填满、移动照片框、锁定照片和移除照片。
- 可通过侧栏按钮或右键菜单移除单张照片。
- 可手动移动照片裁切框本身；右键菜单可让照片框按边距和间距自动重新排版。
- 可锁定单张照片的位置、方向和缩放，避免后续自动排版改动它。
- 自动排版会把后续画布中未锁定的照片向前填补空位。
- 如果照片尺寸大于当前纸张可用区域，照片不会被删除，会保留在画布边距位置，方便继续调整纸张、方向或照片规格。
- 多选一次性添加照片时，可指定本批照片使用的画布数量，并自动选择照片打印尺寸尽量铺满画布。
- 鼠标左键或移动端单指拖动照片内图像，用于选择裁切区域。
- 鼠标滚轮或移动端双指缩放照片，最小缩放会保持照片填满裁切框。
- 移动端长按照片可打开右键菜单。
- 可设置裁切边距、照片间距、出血参考线。
- 根据当前照片数量自动排版，放不下时自动创建多张画布。
- 可导出当前画布或全部画布为 300/600 DPI PNG。

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

## 部署到 Linux NAS 局域网

这个项目是静态网页，只需要把 `index.html`、`styles.css`、`app.js` 放到一个 Web 服务目录里。

### 方式一：Python 临时服务

适合先在 NAS 上快速试用。

```bash
cd /path/to/photo_print_layout
python3 -m http.server 9600
```

同一局域网设备访问：

```text
http://NAS的局域网IP:9600/
```

例如：

```text
http://192.168.1.20:9600/
```

### 方式二：Nginx 长期服务

把项目复制到 NAS，例如：

```bash
sudo mkdir -p /volume1/docker/pic_layout/html
sudo cp index.html styles.css app.js /volume1/docker/pic_layout/html
```

新增 Nginx 配置
```bash
sudo mkdir -p /volume1/docker/pic_layout/conf
vi /volume1/docker/pic_layout/conf/default.conf
```

```nginx
server {
    listen 80 default_server;
    server_name  pic_layout;

    root  /usr/share/nginx/html;
    index  index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

新建docker-compose.yaml
```yaml
version: '3'
services:
  pic_layout:
    user: "0:0"
    image: nginx:latest
    container_name: pic_layout
    ports:
      - "9600:80"
    volumes:
      - /volume1/docker/pic_layout/html:/usr/share/nginx/html:rw
      - /volume1/docker/pic_layout/conf/default.conf:/etc/nginx/conf.d/default.conf:rw
    restart: unless-stopped
```



然后重载 Nginx：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

局域网访问：

```text
http://NAS的局域网IP:8080/
```

### 移动设备注意事项

- iPhone、iPad、Android 手机和平板都可以直接用浏览器访问。
- 上传照片和导出 PNG 都在浏览器本地完成，照片不会自动上传到服务器。
- iOS Safari 可能会把下载文件保存到“文件”App 的下载目录。
- 如果要让别人从公网访问，建议使用 HTTPS，否则部分浏览器能力和下载体验可能受限制。

## 发布到互联网

由于项目没有后端，可以发布到任意静态网站托管服务。

### GitHub Pages

1. 新建一个 GitHub 仓库。
2. 上传 `index.html`、`styles.css`、`app.js`、`README.md`。
3. 进入仓库 `Settings` -> `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub 生成访问地址。

### Cloudflare Pages / Netlify / Vercel

这些平台都可以直接部署静态项目：

- 构建命令留空。
- 输出目录填写项目根目录，或按平台要求填写 `/`。
- 上传整个项目目录即可。

### 公网访问自己的 NAS

可选方案：

- 路由器端口转发到 NAS 的 Web 服务端口。
- 使用 Cloudflare Tunnel、Tailscale Funnel、frp 等反向代理。
- 配置域名和 HTTPS 证书。

如果只是给家人或朋友在局域网使用，不需要公网部署。

## 后续迭代建议

- 增加保存/加载工程文件，记录照片布局、缩放和偏移。
- 增加更强的装箱算法，例如优先旋转、按面积排序、混合尺寸铺满。
- 增加打印安全区模板，适配具体打印机不可打印边距。
- 增加导出带裁切线的预览版，以及不带裁切线的正式打印版。
