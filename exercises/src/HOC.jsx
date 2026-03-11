
function BaseComponent(props) {
  return (
    <div onClick={props.onClick} >
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

const withLogger = (WrappedComponent) => {
  return function ClickLogger(props) {

    function onClick(e) {
      console.log(e)
    }

    const { title, content } = props;
    return (
      <div id={123} arial-label="szöveg" >
        <WrappedComponent {...props} onClick={onClick} />
      </div>
    );
  }
}

const WrappedComp = withLogger(BaseComponent);

export default function App() {
  return <WrappedComp title="Masterfield" content="Szöveg" />
}
