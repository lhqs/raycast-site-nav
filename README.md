# Raycast 网站导航扩展

本项目是一个 Raycast 扩展，配合主站点导航项目 [lhqs-site-nav](https://github.com/lhqs/lhqs-site-nav) 使用，实现高效的网址收藏、搜索与自动同步。

## 功能简介

- **网址搜索**：在 Raycast 内快速检索你的所有网址收藏，支持标签、标题、URL 多字段模糊搜索。
- **添加网址**：通过表单直接添加新网址，支持标题、URL、标签等字段。
- **自动同步**：每次添加新网址后，自动将 [lhqs-site-nav](https://github.com/lhqs/lhqs-site-nav) 项目的 `website.json` 文件提交并推送到 GitHub，无需手动同步。

## 项目结构

- 本扩展目录：`/Users/lhqs/developer/workspace/extension/site`
- 主站点数据目录：`/Users/lhqs/developer/workspace/github/lhqs-site-nav/src/data/website.json`

## 快速开始

1. **安装依赖**
   ```bash
   pnpm install
   # 或 npm install
   ```

2. **开发调试**
   ```bash
   pnpm run dev
   # 或 ray develop
   ```

3. **主要命令**
   - `site`：网址导航主入口
   - `site-add`：添加新网址（表单）

4. **自动同步说明**
   - 每次添加新网址后，扩展会自动执行：
     ```bash
     cd /Users/lhqs/developer/workspace/github/lhqs-site-nav
     git add src/data/website.json
     git commit -m "raycast: add some site"
     git push
     ```
   - 请确保本地仓库已配置好 Git 远程和权限（如 SSH key），否则推送会失败。

## 关联项目

- 主站点仓库：[lhqs-site-nav](https://github.com/lhqs/lhqs-site-nav)

## 适用场景

- 个人或团队有大量网址收藏、需要多端同步和检索的场景
- 希望用 Raycast 快速添加、管理和同步网址导航

---

如有问题或建议，欢迎 issue 或 PR！