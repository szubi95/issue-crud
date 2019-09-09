package com.example.plugins.tutorial.rest.model;

//import lombok.*;
//
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.*;
import java.util.Date;

@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyRestResourceXmlModel {

    @XmlElement(name = "id")
    private long id;

    @XmlElement(name = "name")
    private String name;

    @XmlElement(name = "date")
    private Date date;
}