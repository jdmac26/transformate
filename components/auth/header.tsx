interface HeaderProps {
  header: string;
  label: string;
};

export const Header = ({
  header,
  label,
}: HeaderProps) => {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        {header}
      </h1>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
    </div>
  );
};