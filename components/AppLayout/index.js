import styles, { globalStyles } from "./styles";

export const AppLayout = ({ children }) => {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>

      <style jsx>{styles}</style>

      <style jsx global>
        {globalStyles}
      </style>
    </>
  );
};
