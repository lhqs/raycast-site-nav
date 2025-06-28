import { ActionPanel, Action, Form, showToast, Toast } from "@raycast/api";
import { useState } from "react";
import fs from "fs/promises";
import { exec } from "child_process";



const JSON_PATH = "/Users/lhqs/developer/workspace/github/lhqs-site-nav/src/data/website.json";

type WebsiteItem = {
  title: string;
  url: string;
  tags: string;
};

async function gitCommitAndPush() {
  return new Promise((resolve, reject) => {
    exec(
      `cd /Users/lhqs/developer/workspace/github/lhqs-site-nav && git add . && git commit -m "raycast: add some site" && git push`,
      (error, stdout, stderr) => {
        if (error) reject(stderr || stdout);
        else resolve(stdout);
      }
    );
  });
}


export default function Command() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values: WebsiteItem) {
    setIsLoading(true);
    try {
      const content = await fs.readFile(JSON_PATH, "utf-8");
      const list: WebsiteItem[] = JSON.parse(content);
      list.unshift(values); // 新增在最前
      await fs.writeFile(JSON_PATH, JSON.stringify(list, null, 2), "utf-8");
      await gitCommitAndPush(); // 新增
      showToast({ style: Toast.Style.Success, title: "已保存并推送" });
    } catch (e) {
      showToast({ style: Toast.Style.Failure, title: "保存失败", message: String(e) });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action.SubmitForm title="保存" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="url" title="网址" placeholder="请输入网址" />
      <Form.TextField id="title" title="标题" placeholder="请输入标题" />
      <Form.TextField id="tags" title="标签" placeholder="空格分隔，如 blog tech" />
    </Form>
  );
}
