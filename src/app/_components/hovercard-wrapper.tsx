import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type THoverCardProps = {
  description: string | React.ReactNode;
  children: React.ReactNode;
} & React.ComponentProps<typeof HoverCardContent>;

export default function HoverCardWrapper({
  description,
  children,
  ...props
}: THoverCardProps) {
  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <HoverCardTrigger className="!cursor-pointer">{children}</HoverCardTrigger>
      <HoverCardContent {...props}>{description} </HoverCardContent>
    </HoverCard>
  );
}
