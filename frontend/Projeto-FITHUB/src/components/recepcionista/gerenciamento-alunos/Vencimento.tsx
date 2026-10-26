import Icon from "./Icon";
import formatarData from "./formatarData";

function Vencimento({ data }: { data: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#535b4e]">
      <Icon nome="calendario" className="h-4 w-4" />
      {formatarData(data)}
    </span>
  );
}

export default Vencimento;
