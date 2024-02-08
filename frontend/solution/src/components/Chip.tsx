export const Chip = ({ term }: { term: string }) => {
  return (
    <div className="flex flex-col flex-wrap rounded-full bg-[#CCEBF6]">
      <p className="px-2 py-1" style={{ fontSize: "0.7rem" }}>{term}</p>
    </div>
  )
}