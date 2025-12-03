package com.example.cck;

import org.springframework.web.bind.annotation.GetMapping;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
// Springframework 패키지는 그대로 사용합니다.
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;

@Controller
public class EasyViewController {

	// 메인
	@GetMapping(value = { "/easyview/", "/easyview/index" })
	public String easyViewMain(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("selectedIndex", 1); // home
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "easyview/index";
	}

	// 로그인
	@GetMapping(value = { "/easyview/login/", "/easyview/login/index" })
	public String easyViewLogin(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/login/index";
	}

	// 관리 카드
	// 고객정보
	@GetMapping(value = { "/easyview/management/01", "/easyview/management/manageInfo" })
	public String easyViewManagement01(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("selectedIndex", 2); // management
		model.addAttribute("tabsIndex", 1); // management
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/management/manageInfo";
	}

	// 점검이력
	@GetMapping(value = { "/easyview/management/02", "/easyview/management/manageHistory" })
	public String easyViewManagement02(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("selectedIndex", 2); // management
		model.addAttribute("tabsIndex", 1); // management
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/management/manageHistory";
	}

	// 점검이력 - 바텀시트
	@GetMapping("/easyview/bottomSheet/inspectionHistory")
	public String openBottomSheetInspectionHistory() {
		return "/easyview/bottomSheet/inspectionHistory :: fragment";
	}

	// 내 렌탈정보
	@GetMapping(value = { "/easyview/rental/", "/easyview/rental/index" })
	public String easyViewRental(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("selectedIndex", 3); // rental
		model.addAttribute("tabsIndex", 2); // rental
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/rental/index";
	}

	// 제품 안내
	@GetMapping(value = { "/easyview/product/", "/easyview/product/index" })
	public String easyViewProduct(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 3); // 제품 안내
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/product/index";
	}

	// 고객지원
	// 사용설명서
	@GetMapping(value = { "/easyview/support/01", "/easyview/support/supportManual" })
	public String easyViewSupport01(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 4); // 고객지원
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/support/supportManual";
	}

	// 서비스영상
	@GetMapping(value = { "/easyview/support/02", "/easyview/support/supportVideo" })
	public String easyViewSupport02(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 4); // 고객지원
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/support/supportVideo";
	}

	// 서비스영상 - 바텀시트
	@GetMapping("/easyview/bottomSheet/videoSelect")
	public String openBottomSheetVideoSelect() {
		return "/easyview/bottomSheet/videoSelect :: fragment";
	}

	// FaQ
	@GetMapping(value = { "/easyview/support/03", "/easyview/support/supportFaq" })
	public String easyViewSupport03(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 4); // 고객지원
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/support/supportFaq";
	}

	// 소모품 구매
	@GetMapping(value = { "/easyview/supplies/", "/easyview/supplies/index" })
	public String easyViewSupplies(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 5); // 소모품구매
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/supplies/index";
	}

	// 소모품 구매 - 제품군 구매리스트 modal
	@GetMapping("/easyview/popup/suppliesDetail")
	public String openModalSuppliesDetail(Model model) {
		return "/easyview/popup/suppliesDetail :: fragment";
	}

	// as 신청
	@GetMapping(value = { "/easyview/request/", "/easyview/request/index" })
	public String easyViewRequest(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		model.addAttribute("tabsIndex", 6); // AS신청
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/request/index";
	}

	// as 신청 - 바텀시트
	@GetMapping("/easyview/bottomSheet/termsCheck")
	public String openBottomSheetTermsCheck() {
		return "/easyview/bottomSheet/termsCheck :: fragment";
	}

	// as 신청 - 서비스요금 안내 modal
	@GetMapping("/easyview/popup/requestServiceInfo")
	public String openModalRequestServiceInfo(Model model) {
		return "/easyview/popup/requestServiceInfo :: fragment";
	}

	// my page
	@GetMapping(value = { "/easyview/mypage/", "/easyview/mypage/index" })
	public String easyViewMypage(HttpServletRequest request, HttpServletResponse response, Model model,
			HttpSession session) {
		session.removeAttribute("tempUser");
		session.removeAttribute("authType");

		return "/easyview/mypage/index";
	}

	// my page - as신청내역 modal
	@GetMapping("/easyview/popup/asRequestDetail")
	public String openModalAsRequestDetail(Model model) {
		return "/easyview/popup/asRequestDetail :: fragment";
	}

}
