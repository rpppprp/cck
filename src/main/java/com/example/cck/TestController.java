package com.example.cck;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    // 브라우저에서 http://localhost:9090/test 로 접속하면 이 메서드가 실행됩니다.
    @GetMapping("/index")
    public String showTestPage(Model model) {

        // 1. Model 객체를 사용하여 HTML 템플릿으로 데이터를 전달합니다.
        model.addAttribute("title", "스프링 부트 & 타임리프 테스트 성공!");
        model.addAttribute("greeting", "안녕하세요! 컨트롤러에서 전달된 메시지입니다.");

        // 2. 리턴 값 "testpage"는 templates 폴더 아래의 testpage.html 파일을 찾으라는 의미입니다.
        return "index";
    }
}