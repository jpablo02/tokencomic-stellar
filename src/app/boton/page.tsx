import TokenIdFetcher from "../../components/ui/TokenIdFetcher";
import ApiTester from "../../components/ui/ApiTester";



export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
     
      <TokenIdFetcher />
      <ApiTester />
    </div>
  );
}
