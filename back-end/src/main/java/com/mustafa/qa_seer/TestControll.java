package com.mustafa.qa_seer;

import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TestControll {

    @GetMapping("/test")
    public String test() {
        return "This is from the back-end :)";
    }

    @PostMapping("/test")
    public String  postTest(@RequestBody String message) {
        System.out.println(message.);
        return "we received your message";
    }


}
