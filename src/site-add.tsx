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


const initialFormValues: WebsiteItem = { title: "", url: "", tags: "" };

export default function Command() {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<WebsiteItem>(initialFormValues);

  async function handleSubmit(values: WebsiteItem) {
    setIsLoading(true);
    const submittingToast = await showToast({ style: Toast.Style.Animated, title: "正在提交..." });
    try {
      // 处理tags: 统一空格分隔
      const tags = values.tags
        .replace(/[,，、\s]+/g, " ") // 逗号(中英文)、顿号、任意空白字符都替换为一个空格
        .trim()
        .replace(/\s+/g, " "); // 多个空格合并为一个

      const content = await fs.readFile(JSON_PATH, "utf-8");
      const list: WebsiteItem[] = JSON.parse(content);
      list.push({ ...values, tags }); // 新增在最后
      await fs.writeFile(JSON_PATH, JSON.stringify(list, null, 2), "utf-8");
      await gitCommitAndPush(); // 新增
      showToast({ style: Toast.Style.Success, title: "已保存并推送" });
      // 清空表单
      setFormValues(initialFormValues);
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
      values={formValues}
      onChange={setFormValues}
    >
      <Form.TextField id="url" title="网址" placeholder="请输入网址" value={formValues.url} />
      <Form.TextField id="title" title="标题" placeholder="请输入标题" value={formValues.title} />
      <Form.TextField id="tags" title="标签" placeholder="空格分隔，如 blog tech" value={formValues.tags} />
    </Form>
  );
}
