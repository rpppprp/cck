"use strict";

function easyViewInit(){


	/**--------------------------------------------
	 * 
	 * Common
	 * 
	----------------------------------------------*/

	window.addEventListener('pageshow', function(event) {
	    // 뒤로가기 복원(bfcache)되었을 때
	    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
	        $(".mobile-gnb-wrap").hide(); // 강제 닫기
	    }
	});


	/**--------------------------------------------
	 * 
	 * Mobile Gnb Menu
	 * 
	----------------------------------------------*/

	$(".mobile-gnb-wrap").hide();
	
	/* mobile gnb modal // bottom-nav */

	$(".bottom-menu a").click(function(){
		$(".mobile-gnb-wrap").toggle(200);
		$('html, body').addClass('scroll-none'); // scroll off
	})
	
	$(".mobile-header .close-btn").click(function(){
		$(".mobile-gnb-wrap").toggle(200);
		$('html, body').removeClass('scroll-none');// scroll on
	})
	
	/* mobile gnb modal // header */
	
	$(".gnb-right a.menu").click(function(){
		$(".mobile-gnb-wrap").toggle(200);
		$('html, body').addClass('scroll-none'); // scroll off
	})
	
	
	/**--------------------------------------------
	 * 
	 * Sub Tab Nav
	 * 
	----------------------------------------------*/

	var SubTabSwiper = new Swiper('.sub-gnb-tab', {
	    slidesPerView: "auto",
	    observer: true,
	    observeParents: true,
	    slideToClickedSlide: true,
	    freeMode: true
	});
	
	// 활성 탭(on 클래스)으로 자동 스크롤
	const activeIndex = document.querySelector('.sub-gnb-tab .tab-item.on');
	
	if (activeIndex) {
	    const index = Array.from(activeIndex.parentNode.children).indexOf(activeIndex);
	    SubTabSwiper.slideTo(index, 0); // (index, transitionSpeed)
	}
	
	
	/**--------------------------------------------
	 * 
	 * Product
	 * 
	----------------------------------------------*/
	
	
	$(".product-supplies-wrap .supplies-track").slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 300,
		centerPadding: '30px',
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true
	});
	
	
	
	/**--------------------------------------------
	 * 
	 * Support
	 * 
	----------------------------------------------*/
	
	// Support : select 클릭 → 공통 바텀시트 오픈
	const $supportSelect = $("#support-cate-select");
	
	// select 클릭 시 기본 드롭다운 막고 바텀시트 열기
	$supportSelect.on("mousedown touchstart", function(e) {
		e.preventDefault(); // 기본 select 드롭다운 열림 방지
	
		// 공통 바텀시트 오픈 (지정된 fragment 로드)
		openBottomSheet("/easyview/bottomSheet/videoSelect");
	
		// fragment 로드 완료 감지 → 옵션 클릭 이벤트 연결
		const observer = new MutationObserver(function(mutations, obs) {
			const $options = $("#bottomSheetContent .bt-select-option");
			if ($options.length) {
				bindBottomSheetSelect($supportSelect);
				highlightSelectedOption($supportSelect); // 현재 선택된 값 표시
				obs.disconnect();
			}
		});
	
		const target = document.getElementById("bottomSheetContent");
		if (target) {
			observer.observe(target, { childList: true, subtree: true });
		}
	});
	
	const $cate_item = $(".cate-tab-item a");
	$cate_item.click(function(){
		var _this = $(this);
		$cate_item.parent('li').removeClass('on');
		_this.parent('li').addClass('on');
	})
	
	
	
	/**--------------------------------------------
	 * 
	 * AS신청
	 * 
	----------------------------------------------*/
	
	const $zipcode = $("#rq-zip-input");
	const $address0 = $("#rq-address-input");
	const $address1 = $("#rq-address-input2");
	
	// 주소 입력 체크 함수
	function isAddressFilled() {
	    return $zipcode.val().trim() !== '' && $address0.val().trim() !== '';
	}
	
	// 주소찾기 버튼 클릭 시 다음 주소 API 호출
	$('.rq-zip-btn').on('click', function () {
	    new daum.Postcode({
	        oncomplete: function (data) {
	            $zipcode.val(data.zonecode);
	            $address0.val(data.roadAddress || data.jibunAddress);
	        }
	    }).open();
	});
	
}

$(function(){
	
	easyViewInit();
	
});