import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectMenu() {
  return (
    <Select defaultValue="personal">
      <SelectTrigger className="text-primary w-[180px] font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem className="text-primary font-medium" value="personal">
            Personal
          </SelectItem>
          <SelectItem className="text-primary font-medium" value="business">
            Business
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
