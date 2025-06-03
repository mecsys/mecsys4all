package br.com.mecsys.mecsys4all;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/basic")
public class BasicController {
    
    @Autowired
    Optional<BuildProperties> buildProperties;

    @GetMapping("/ping")
    public String ping() {
        return "I'm basic:" + buildProperties.orElseThrow().getVersion();
    }
}
