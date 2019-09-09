package com.example.plugins.tutorial.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.ArrayList;
import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyRestResourceJsonModels {

    @JsonProperty("component")
    List<MyRestResourceJsonModel> components = new ArrayList<>();
}
