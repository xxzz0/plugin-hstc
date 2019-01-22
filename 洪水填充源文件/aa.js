$(function() {
	var e, d = document.getElementById("canvas"),
		f = d.getContext("2d"),
		g = new Image(),
		h = false,
		i = false,
		j = $("#loader"),
		b = [
			[272, 25],
			[500, 200],
			[412, 450],
			[280, 460],
			[100, 350],
			[110, 180],
			[220, 230],
			[250, 270],
			[120, 430],
			[310, 530],
			[530, 475]
		],
		c = [
			[234, 350],
			[466, 128],
			[360, 200],
			[244, 190],
			[100, 150],
			[36, 124],
			[110, 100],
			[140, 40],
			[60, 225],
			[250, 280],
			[450, 270]
		],
		a = document.getElementById("audio");
	g.onload = function() {
		f.drawImage(g, 0, 0)
	};
	g.crossOrigin = "";
	g.src = "images/balloon_plane.png";
	$("#wire").on("click", function(n) {
		if (!e) {
			alert("请选择你喜欢颜色！");
			return false
		}
		n = n.originalEvent || n;
		var k = $(this).offset();
		var l = Math.floor(n.pageX - k.left);
		var m = Math.floor(n.pageY - k.top);
		var p = f.getImageData(l, m, 1, 1);
		var q = p.data;
		if (q[0] === 0 && q[1] === 0 && q[2] === 0 && q[3] === 0) {
			alert("此处不能上色哦~");
			return false
		}
		var o = hexToRgb(e).split(",");
		o.push(255);
		floodFillLinear(d, l, m, o, 80);
		h = true
	});
	$("#btnComplete").on("touchstart", function() {
		_hmt.push(["_trackEvent", "complete", "cilck"]);
		if (!h) {
			alert("请选择你喜欢的颜色，为神秘图形添彩吧！");
			return false
		}
		setTimeout(function() {
			j.html("").addClass("loading")
		}, 0);
		var k = document.createElement("canvas");
		var l = k.getContext("2d");
		var m = new Image();
		m.onload = function() {
			k.width = m.naturalWidth;
			k.height = m.naturalHeight;
			l.drawImage(m, 0, 0);
			for (var o = 0; o < 11; o++) {
				var q = b[o],
					n = c[o];
				var p = f.getImageData(q[0], q[1], 1, 1);
				floodFillLinear(k, n[0], n[1], p.data, 40)
			}
			var r = new Image();
			r.onload = function() {
				l.drawImage(r, 0, 0);
				var s = k.toDataURL("image/png").substr(22);
				$.ajax({
					url: "Handler.ashx?action=upload&o=",
					data: {
						img: s
					},
					type: "POST",
					dataType: "json",
					success: function(t) {
						if (t.errcode > 0) {
							$("#balloon").css({
								"-webkit-transform": "translateX(-100%)",
								transform: "translateX(-100%)"
							});
							$("#drawBalloon").hide();
							$("#showBalloon").show();
							$("#work").delay(800).css({
								"-webkit-transform": "translateY(-200px)",
								transform: "translateY(-200px)"
							}).find("img").attr("src", t.msg);
							wxShare.link = "http://pgchina.birthday.i2mago.com.cn/Vote.aspx?id=" + t.errcode;
							wxShare.imgUrl = "http://image.pgchina.birthday.i2mago.com.cn/" + t.msg;
							wxShare.desc = "哇~宝洁生日送Apple Watch，快给我的杰作点赞！";
							h = false
						} else {
							alert(t.msg)
						}
					},
					error: function(t) {
						alert(JSON.stringify(t))
					},
					complete: function(u, t) {
						j.removeClass("loading")
					}
				})
			};
			r.crossOrigin = "";
			r.src = "images/balloon_stereogram_wire.png"
		};
		m.crossOrigin = "";
		m.src = "images/balloon_stereogram.png"
	});
	$("#btnRedraw").on("click", function() {
		_hmt.push(["_trackEvent", "redraw", "cilck"]);
		f.clearRect(0, 0, d.width, d.height);
		f.drawImage(g, 0, 0);
		h = false;
		$("#balloon").css({
			"-webkit-transform": "translateX(0)",
			transform: "translateX(0)"
		});
		$("#drawBalloon").show();
		$("#showBalloon").hide();
		$("#work").delay(800).css({
			"-webkit-transform": "translateY(0)",
			transform: "translateY(0)"
		});
		i = true;
		return false
	});
	$("#btnShare").on("click", function() {
		_hmt.push(["_trackEvent", "share_default", "cilck"]);
		$("#shareTips").show().on("click", function() {
			$(this).hide();
			return false
		});
		return false
	});
	$("#colors").on("click", "li:not(.checked)", function() {
		var k = $(this);
		k.addClass("checked").siblings(".checked").removeClass("checked");
		e = k.html()
	});
	$("#btnRule").on("click", function() {
		_hmt.push(["_trackEvent", "rule", "cilck"]);
		$("#rule").show();
		$("#home").hide()
	});
	$("#btnClose").on("click", function() {
		$("#home").show();
		$("#rule").hide()
	});
	$("#btnOpenCard").on("click", function() {
		_hmt.push(["_trackEvent", "start", "cilck"]);
		$("#balloon").show();
		$("#home").fadeOut(800, function() {
			setTimeout(function() {
				$("#cardTips").fadeOut(800)
			}, 3000)
		})
	});
	$("a.switch").on("click", function() {
		if (a != null) {
			var k = $("a.switch");
			if (k.hasClass("mute")) {
				k.removeClass("mute");
				a.play()
			} else {
				k.addClass("mute");
				a.pause()
			}
		}
	});
	setTimeout(function() {
		var k = ["images/switch_1.png", "images/switch_0.png", "images/cake_1.png", "images/share_tips_0.png", "images/products.jpg", "images/color_checked.png", "images/caption_2.png", "images/btns_1.png", "images/balloon_stereogram_wire.png", "images/balloon_stereogram.png", "images/balloon_plane_wire.png", "images/balloon_plane.png", "images/btn_complete.png", "images/caption_1.png", "images/card.png", "images/bg.jpg", "images/home_bg.jpg"];
		loadImages({
			images: k
		})
	}, 0)
});