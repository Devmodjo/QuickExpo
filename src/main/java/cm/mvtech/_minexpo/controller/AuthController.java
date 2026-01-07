package cm.mvtech._minexpo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/success")
    public String success() {
        return "Authentification Google réussie. Vous pouvez fermer cette page.";
    }
}
