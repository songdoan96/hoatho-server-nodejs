import { Button, Flex, Input, Typography } from "antd";
import { useRef, useState } from "react";
import EditorComponent from "../../components/Editor";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
function Add() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const mutation = useMutation({
    mutationFn: ({ title, content }) => {
      return axios.post("http://localhost:3000/news/add", { title, content });
    },
  });

  function handleSubmit() {
    if (editorRef.current) {
      mutation.mutate({
        title: title,
        content: editorRef.current.getContent(),
      });
    }
  }
  return (
    <Flex vertical>
      <Typography.Title level={3} style={{ textAlign: "center", textTransform: "uppercase" }}>
        Thêm bản tin
      </Typography.Title>
      <Flex gap={"large"}>
        <Flex
          align="center"
          justify="center"
          style={{ width: "50%", minHeight: "calc(100vh - 75px)" }}
        >
          <EditorComponent editorRef={editorRef} />
        </Flex>

        <Flex vertical gap={"large"} style={{ width: "50%" }}>
          <Input placeholder="Tiêu đề" size="large" onChange={(e) => setTitle(e.target.value)} />
          <Flex justify="end">
            <Button size="large" type="primary" onClick={handleSubmit}>
              Thêm
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Add;
