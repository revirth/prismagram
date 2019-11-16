import React from "react";
import SearchBar from "../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <SearchBar
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
        value={navigation.getParam("term", "")}
      />
    )
  });

  constructor(props) {
    super(props);
    const { navigation } = props;

    this.state = { term: "", shouldFetch: false };

    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }

  onChange = text => {
    this.setState({ term: text, shouldFetch: false });

    const { navigation } = this.props;
    navigation.setParams({ term: text });
  };

  onSubmit = () => {
    console.log("submit");

    this.setState({ shouldFetch: true });
  };

  render() {
    const { term, shouldFetch } = this.state;

    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}
