"use strict";


/* -----------------------------
 * 공통 바텀시트 열기 / 닫기
 * ----------------------------- */

function openBottomSheet(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            $("#bottomSheetContent").html(data);
            $(".bottomsheet-wrap").fadeIn(200);
            $('html, body').addClass('scroll-none'); // scroll off
        },
        error: function (xhr, status, error) {
            console.error("바텀시트 로드 실패:", error);
        }
    });
}

function closeBottomSheet() {
    $(".bottomsheet-wrap").fadeOut(200);
    $('html, body').removeClass('scroll-none');// scroll on
}


/* -----------------------------
 * 셀렉트 바텀시트
 * ----------------------------- */

// 바텀시트 내부 옵션 클릭 시 select 값 변경
function bindBottomSheetSelect($select) {
	const $options = $("#bottomSheetContent .bt-select-option");

	$options.off("click").on("click", function() {
		const value = $(this).data("value");
		const text = $(this).find(".txt").text();

		$select.val(value).trigger("change");
		$options.removeClass("on");
		$(this).addClass("on");
		closeBottomSheet();
	});
}

// 현재 select 값에 맞춰 바텀시트에서 on 표시
function highlightSelectedOption($select) {
	const selectedValue = $select.val();
	const $options = $("#bottomSheetContent .bt-select-option");
	$options.removeClass("on");
	$options.each(function() {
		if ($(this).data("value") == selectedValue) {
			$(this).addClass("on");
		}
	});
}


/* -----------------------------
 * 약관 바텀시트 (terms)
 * ----------------------------- */
function bindTermsBottomSheet() {
    // "모두 동의" 클릭 시 전체 체크
    $(document).on("click", ".bt-terms-area .all-terms", function () {
        const $allCheck = $(this);
        const $container = $allCheck.closest(".bt-terms-area");

        if ($allCheck.is(":checked")) {
            $container.find("input[name=terms]").prop("checked", true);
        } else {
            $container.find("input[name=terms]").prop("checked", false);
        }
    });

    // 개별 체크박스 변경 시 "모두 동의" 상태 갱신
    $(document).on("change", ".bt-terms-area input[name=terms]", function () {
        const $container = $(this).closest(".bt-terms-area");
        const total = $container.find("input[name=terms]").length;
        const checked = $container.find("input[name=terms]:checked").length;
        $container.find(".all-terms").prop("checked", total === checked);
    });

    // "자세히 보기" 클릭 시 (필요시 추가)
    $(document).on("click", ".bt-terms-area .terms-more", function () {
        const termId = $(this).siblings("input").attr("id");
        console.log(`약관 ${termId} 상세 보기 클릭`);
        // 여기에 상세 약관 바텀시트나 팝업 열기 로직 추가 가능
    });
}


$(document).on("change", "#all-terms-check", function () {
    const isChecked = $(this).is(":checked");

    // 본페이지에 있는 버튼 (예: .agree-btn)
    const $pageButton = $(".privacy-all-btn");

    if (isChecked) {
        $pageButton.addClass("on");
    } else {
        $pageButton.removeClass("on");
    }
});



/* -----------------------------
 * 공통 풀사이즈 모달 열기 / 닫기
 * ----------------------------- */

function openPopUp(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function (data) {
            // 임시 div에 fragment 넣기
            var tempDiv = $('<div>').html(data);

            // fragment-title 추출
            var title = tempDiv.find('.fragment-title').text() || '';
            if (title) {
                $('.fullmodal-wrap .location-txt').text(title);
                tempDiv.find('.fragment-title').remove(); // content에서 제거
            }

            // 나머지 내용 삽입
            $("#fullModal-content").html(tempDiv.html());
            $(".fullmodal-wrap").fadeIn(200);
            $('html, body').addClass('scroll-none'); // scroll off
        },
        error: function (xhr, status, error) {
            console.error("팝업 로드 실패:", error);
        }
    });
}

function closePopUp() {
    $(".fullmodal-wrap").fadeOut(200);
    $('html, body').removeClass('scroll-none');// scroll on
}


/* -----------------------------
 * 초기 실행
 * ----------------------------- */

window.openBottomSheet = openBottomSheet;
window.closeBottomSheet = closeBottomSheet;
window.bindBottomSheetSelect = bindBottomSheetSelect;
window.highlightSelectedOption = highlightSelectedOption;
window.bindTermsBottomSheet = bindTermsBottomSheet;

window.openPopUp = openPopUp;
window.closePopUp = closePopUp;

// DOM 로드 후 실행
$(function () {
    bindTermsBottomSheet(); // 약관 바텀시트 이벤트 초기화
});
