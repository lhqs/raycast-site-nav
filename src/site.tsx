import { ActionPanel, Action, Icon, List, open } from "@raycast/api";
import { useEffect, useState } from "react";
import fs from "fs/promises";

const JSON_PATH = "/Users/lhqs/developer/workspace/github/lhqs-site-nav/src/data/website.json";

type WebsiteItem = {
  title: string;
  url: string;
  tags: string;
  desc?: string;
};

export default function Command() {
  const [items, setItems] = useState<WebsiteItem[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fs.readFile(JSON_PATH, "utf-8").then((content) => {
      setItems(JSON.parse(content));
    });
  }, []);

  const filtered = items.filter((item) => {
    const q = searchText.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.url.toLowerCase().includes(q) ||
      item.tags.toLowerCase().includes(q)
    );
  });

  return (
    <List
      searchBarPlaceholder="搜索网站标题、标签或URL"
      onSearchTextChange={setSearchText}
      isLoading={items.length === 0}
    >
      {filtered.map((item, idx) => (
        <List.Item
          key={idx}
          icon={Icon.Globe}
          title={item.title}
          subtitle={item.tags}
          accessories={item.desc ? [{ text: item.desc }] : []}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.url} />
              <Action.CopyToClipboard content={item.url} title="复制链接" />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
