package cm.mvtech._minexpo.config;


import cm.mvtech._minexpo.auth.OAuth2SuccessHandler;
import lombok.RequiredArgsConstructor;
import jakarta.servlet.http.Cookie;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final OAuth2SuccessHandler successHandler;

    @Bean
    public SecurityFilterChain filterChain (HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/**",
                                "/public/**",
                                "/webhook/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/login/oauth2/code/github",
                                "/login/oauth2/code/github/**",
                                "/v3/api-docs/**", "/oauth2/**", "/login/**"
                        ).permitAll()
                        .requestMatchers(
                                "/api/auth/me",
                                "/logout", "/api/orders/**").authenticated()
                )
                .oauth2Login(oauth -> oauth
                        .successHandler(successHandler)
                ).logout( logout -> logout.logoutUrl("/logout")
                        .addLogoutHandler(((request, response, authentication) -> {
                            // suppression du cookie
                            Cookie cookie = new Cookie("auth_token", null);
                            cookie.setPath("/");
                            cookie.setMaxAge(0);
                            cookie.setHttpOnly(true);
                            response.addCookie(cookie);
                        })));

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/webjars/**");
    }
}
