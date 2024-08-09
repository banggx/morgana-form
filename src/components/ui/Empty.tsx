import { Empty as AntEmpty } from "antd";
import { cn } from "@/lib/utils";
import { EmptyIcon } from "@/constants/common";

interface EmptyProps {
  content: React.ReactNode;
  className?: string;
}
export default function Empty(props: EmptyProps) {
  const { content, className } = props;
  return (
    <div
      className={cn(["flex flex-col items-center justify-center", className])}
    >
      <AntEmpty
        image={EmptyIcon}
        imageStyle={{ minHeight: 150 }}
        description={content}
      ></AntEmpty>
    </div>
  );
}
