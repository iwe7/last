export function relative() {
  return (Component: any) => {
    return class IHoc extends Component {
      constructor(props: any) {
        super({ ...props });
      }
      render() {
        return super.render();
      }
    };
  };
}
