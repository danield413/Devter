import { colors, fonts } from "../../styles/theme"

const Button = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          align-items: center;
          background: ${colors.black};
          border: 0;
          color: ${colors.white};
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          font-weight: 500;
          padding: 8px 24px;
          font-family: ${fonts.base};
          transition: opacity 0.3s ease;
          outline: none;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

export default Button
