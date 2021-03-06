var my_news = [
  {
    id: '1',
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
    bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem vero minima distinctio placeat, consectetur alias facilis repellendus autem atque inventore amet eaque ad. Cum unde et magni nulla, a cumque.'
  },
  {
    id: '2',
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quidem eaque earum aspernatur totam, inventore, sit dicta, modi incidunt culpa asperiores! Laudantium nisi recusandae suscipit praesentium eius ad eaque tempora.'
  },
  {
    id: '3',
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde praesentium ratione accusamus, dolor consequatur reprehenderit. Tenetur beatae, repudiandae sit possimus perspiciatis ipsam hic, atque quibusdam, reprehenderit consequatur, itaque velit sint!'
  }
];

var Comments = React.createClass({
  render: function() {
    return (
      <div className="comments">
        Нет новостей - комментировать нечего.
      </div>
    );
  }
});

var Article = React.createClass({
  getInitialState: function() { return { visible: false }; },
  read_more: function (e) {
    e.preventDefault();
    this.setState({ visible:true }, function () { console.log('Состояние изменилось'); });
  },
  render : function() {
    var one_new   = this.props.one_new,
        visible   = this.state.visible,
        read_more = this.read_more;
    return (
      <div key={one_new.id} className='article'>
        <p className="news__author">{one_new.author}:</p>
        <p className="news__text">{one_new.text}</p>
        <a href="#" onClick={read_more} className={(visible) ? 'none' : 'news__readmore'}>Подробнее</a>
        <p className={(visible) ? '' : 'none'}>{one_new.bigText}</p>
      </div>
    );
  }
});


var TestInput = React.createClass({
  getInitialState: function () { return { field_value: '' } },
  changeField: function (e) {
    this.setState({field_value: e.target.value });
  },
  showValue: function () {
    console.log(this.refs);
    console.log(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },
  render: function() {
    var changeField = this.changeField,
        showValue = this.showValue,
        value = this.state.field_value;
    return (
      <div>
        <input defaultValue='' ref='myTestInput' className='test-input' placeholder='введите значение' />
        <button onClick={showValue}>Добавить значение</button>
      </div>
    );
  }
});


var News = React.createClass({
  // ПРОВЕРКА, ЧТО ЕСТЬ МАССИВ, НЕ БУДЕТ РАБОТАТЬ НА ПРОДАКШЕНЕ
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() { return { counter: 0 }; },
  count_all_news: function (e) {
    e.preventDefault();
    this.setState({ counter: ++this.state.counter });
  },
  render: function() {
    var count_all_news = this.count_all_news;
    var data = this.props.data;
    var articles = data.map(function(one_new, index) {
      return <Article key={index} one_new={one_new}/>;
    });
    var style = { display:(data.length > 0) ? 'display' : 'none' }
    return (
      <div className="news">
        {articles}
        <strong onClick={count_all_news} style={style}>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>Новости</h3>
        Всем привет, я компонент App! Я умею отображать новости.
        <TestInput/>
        <News data={my_news} />
        <Comments/>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);