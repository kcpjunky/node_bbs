// View helper

exports.helpers = {
	// urlと名前からリンク作成
	link_to: function(name, url) {
		return '<a href="' + url + '">' + name + '</a>';
	},

	//空白を&nbsp; 　改行を <br />
	text_format: function(text) {
		return text.replace(/ /g, '&nbsp;').replace(/\r\n|\n\r/g, '<br />');
	}
};
