
export default function Button({ onClick, content, className, id }) {
    return (
        <button
            onClick={onClick}
            className={className}
            id={id}
        >
            {content}
        </button>
    );
}