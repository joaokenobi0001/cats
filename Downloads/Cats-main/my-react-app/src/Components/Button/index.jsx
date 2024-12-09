import PropTypes from 'prop-types'; // Mantém a validação de props
import './style.css'; // Importa o CSS

function Button({ content, icon = null, ...props }) {
  return (
    <button className="StyledButton" {...props}>
      {icon && <span className="ButtonIcon">{icon}</span>}
      <span className="ButtonContent">{content}</span>
    </button>
  );
}

// Validação das props
Button.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.node, // Permite qualquer tipo de conteúdo (imagem, SVG, etc.)
};

export default Button;


