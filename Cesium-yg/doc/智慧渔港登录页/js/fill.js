function ScreenZm(id, val) {
	this.zoomBox = $("#" + id);
	this.zoomSize = val;
	this.h = this.zoomBox.height();
	this.w = this.zoomBox.width();
	var _this = this;
}

ScreenZm.prototype.getZoomX = function() {

	return $(window).width() / this.w; //1

}
ScreenZm.prototype.getZoomY = function() {

	return $(window).height() / this.h;

}
ScreenZm.prototype.zoomX = function() {

	this.zoomBox.attr("style", "transform:scale(" + this.getZoomX() * this.zoomSize + "," + this.getZoomX() * this.zoomSize + ");");
}
ScreenZm.prototype.zoomY = function() {

	this.zoomBox.attr("style", "transform:scale(" + this.getZoomY() * this.zoomSize + "," + this.getZoomY() * this.zoomSize + ");");
}
ScreenZm.prototype.zoomFull = function() {

	this.zoomBox.attr("style", "transform:scale(" + this.getZoomX() + "," + this.getZoomY() + ");transform-origin:" + "0%" + " " + "0%");
}