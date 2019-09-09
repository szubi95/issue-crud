package com.example.plugins.tutorial.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.codehaus.jackson.annotate.JsonProperty;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyRestResourceJsonModel {

    @JsonProperty("id")
    private long id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("title")
    private String title;

    @JsonProperty("distributionDate")
    private String distributionDate;
}
