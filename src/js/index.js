const date = new Date();
const weeks = ["日", "月", "火", "水", "木", "金", "土"];
let beginningOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
let endOfTheMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
let calender = [];
let holidays = {};

$(function () {
  $.ajax({
    url: "https://holidays-jp.github.io/api/v1/date.json",
    type: "GET",
    dataType: "JSON",
    timeout: 5000,
  }).done(function (result) {
    holidays = result;
    appendDays(beginningOfTheMonth, endOfTheMonth);
  });
});

$(function () {
  $("<h1>")
    .text(date.getFullYear() + "年" + (date.getMonth() + 1) + "月")
    .appendTo("#header");
});

//カレンダー上部に曜日を表示
$(function () {
  for (let i = 0; i < weeks.length; i++) {
    if (i === 0) {
      $("<div>").addClass("red").text(weeks[i]).appendTo("#calender");
    } else if (i === 6) {
      $("<div>").addClass("blue").text(weeks[i]).appendTo("#calender");
    } else {
      $("<div>").text(weeks[i]).appendTo("#calender");
    }
  }
});

//カレンダーに日付を表示
function appendDays(beginningOfTheMonth, endOfTheMonth) {
  let tmpDate = new Date(beginningOfTheMonth.getTime());
  while (tmpDate.getTime() <= endOfTheMonth.getTime()) {
    if (formatDate(tmpDate) in holidays) {
      calender.push({
        date: new Date(tmpDate.getTime()),
        holiday: holidays[formatDate(tmpDate)],
      });
    } else {
      calender.push({ date: new Date(tmpDate.getTime()) });
    }
    tmpDate.setDate(tmpDate.getDate() + 1);
  }
  tmpDate = new Date(beginningOfTheMonth.getTime());
  for (let i = 0; i < beginningOfTheMonth.getDay(); i++) {
    tmpDate.setDate(tmpDate.getDate() - 1);
    calender.unshift({ date: new Date(tmpDate.getTime()) });
  }
  tmpDate = new Date(endOfTheMonth.getTime());
  for (let i = 0; endOfTheMonth.getDay() + i < 6; i++) {
    tmpDate.setDate(tmpDate.getDate() + 1);
    calender.push({ date: new Date(tmpDate.getTime()) });
  }

  for (let i = 0; i < calender.length; i++) {
    if (i % 7 === 0) {
      const dateRedElm = $("<span>")
        .addClass("red")
        .text(calender[i].date.getDate());
      dateRedElm.appendTo("#calender");
      if (calender[i].holiday) {
        $("<div>")
          .addClass("holiday")
          .text(calender[i].holiday)
          .appendTo($(dateRedElm));
      }
    } else if ((i + 1) % 7 === 0) {
      const dateBlueElm = $("<span>")
        .addClass("blue")
        .text(calender[i].date.getDate());
      dateBlueElm.appendTo("#calender");
      if (calender[i].holiday) {
        $("<div>")
          .addClass("holiday")
          .text(calender[i].holiday)
          .appendTo($(dateBlueElm));
      }
    } else {
      const dateElm = $("<span>").text(calender[i].date.getDate());
      dateElm.appendTo("#calender");
      if (calender[i].holiday) {
        $("<div>")
          .addClass("holiday")
          .text(calender[i].holiday)
          .appendTo($(dateElm));
      }
    }
  }
}

function formatDate(date) {
  let y = date.getFullYear();
  let m = ("00" + (date.getMonth() + 1)).slice(-2);
  let d = ("00" + date.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
}

//前月のカレンダーを表示する関数
$(function () {
  $("#prev").click(function () {
    $("#header").children().remove();
    $("#calender").children("span").remove();
    calender = [];
    beginningOfTheMonth = new Date(
      beginningOfTheMonth.getFullYear(),
      beginningOfTheMonth.getMonth() - 1,
      1
    );
    endOfTheMonth = new Date(
      endOfTheMonth.getFullYear(),
      endOfTheMonth.getMonth(),
      0
    );

    $("<h1>")
      .text(
        beginningOfTheMonth.getFullYear() +
          "年" +
          (beginningOfTheMonth.getMonth() + 1) +
          "月"
      )
      .appendTo("#header");
    appendDays(beginningOfTheMonth, endOfTheMonth);
  });
});

$(function () {
  $("#next").click(function () {
    $("#header").children().remove();
    $("#calender").children("span").remove();
    calender = [];
    beginningOfTheMonth = new Date(
      beginningOfTheMonth.getFullYear(),
      beginningOfTheMonth.getMonth() + 1,
      1
    );
    endOfTheMonth = new Date(
      endOfTheMonth.getFullYear(),
      endOfTheMonth.getMonth() + 2,
      0
    );

    $("<h1>")
      .text(
        beginningOfTheMonth.getFullYear() +
          "年" +
          (beginningOfTheMonth.getMonth() + 1) +
          "月"
      )
      .appendTo("#header");
    appendDays(beginningOfTheMonth, endOfTheMonth);
  });
});
