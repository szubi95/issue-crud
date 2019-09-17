package com.example.plugins.tutorial.rest;

import com.example.plugins.tutorial.rest.model.MyRestResourceJsonModel;
import com.example.plugins.tutorial.rest.model.MyRestResourceXmlModel;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Path("/message")
public class MyRestResource {

    private static Logger logger = LoggerFactory.getLogger(MyRestResource.class);

    private List<MyRestResourceXmlModel> storage = new ArrayList<>(Arrays.asList(
            MyRestResourceXmlModel.builder().id(1).name("Name 1").build(),
            MyRestResourceXmlModel.builder().id(2).name("Name 2").build()
    ));

    private List<MyRestResourceJsonModel> storageJson = new ArrayList<>(Arrays.asList(
            MyRestResourceJsonModel.builder().id(1).name("Name1json").description("opis1").title("tytuł1").isGood(false).distributionDate("2019-09-08").build(),
            MyRestResourceJsonModel.builder().id(2).name("Name2json").description("opis2").title("tytuł2").isGood(false).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(3).name("A event").description("opis3").title("tytuł3").isGood(true).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(4).name("Bla bla").description("opis4").title("tytuł4").isGood(false).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(5).name("Bób").description("opis5").title("tytuł5").isGood(true).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(6).name("AA event").description("opis6").title("tytuł6").isGood(false).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(7).name("lupa").description("opis7").title("tytuł7").isGood(true).distributionDate("2019-02-02").build(),
            MyRestResourceJsonModel.builder().id(8).name("json").description("opis8").title("tytuł8").isGood(false).distributionDate("2019-02-02").build()
    ));



//    @GET
//    @Path("/all")
//    @Consumes({MediaType.APPLICATION_XML})
//    @Produces({MediaType.APPLICATION_XML})
//    public Response getAllEvents2() {
//        GenericEntity<List<MyRestResourceXmlModel>> entity = new GenericEntity<List<MyRestResourceXmlModel>>(storage) {};
//
//        return Response
//                .ok(entity)
//                .header("Accept", "application/xml")
//                .header("Content-Type", "application/xml")
//                .build();
//    }

    @GET
    @Path("/all")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response getAllEvents(@QueryParam("value") String value) {

        logger.debug("\n\n\n\n\nSZUBI-INFO: \n\n\n\n\n");

//        .ok(MyRestResourceJsonModels.builder().components(storageJson.stream()
//                .sorted(Comparator.comparing(MyRestResourceJsonModel::getId).reversed())
//                .collect(Collectors.toList())).build())

        if (StringUtils.isBlank(value)) {
            return Response
                    .ok(storageJson.stream()
                            .sorted(Comparator.comparing(MyRestResourceJsonModel::getId))
                            .collect(Collectors.toList()))
                    .build();
        } else {
            return Response.ok(
                    storageJson.stream()
                            .filter(c -> c.getName().equals(value))
                            .collect(Collectors.toList())
                    ).build();
        }
    }

    @GET
    @Path("/self/{id}")
    public Response getEvent(@PathParam("id") String id) {
        return Response.ok(findInStorage(id)).build();
    }

    @PUT
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/self/{id}")
    public Response updateEvent(@PathParam("id") String id, MyRestResourceJsonModel update) {

        System.out.println("\n\n\n\n\n");
        System.out.println("SZUBI-INFO-UPDATE-1: " + update);
        System.out.println("\n\n\n\n\n");
        logger.debug("\n\n\n\n\nSZUBI-INFO-UPDATE: " + update + "\n\n\n\n\n");

        // można zmapowa do kolekcji bez warunku
        // map na metodzie a potem map do encji
        MyRestResourceJsonModel model = findInStorage(id);
        Optional.ofNullable(update.getName()).ifPresent(model::setName);
        Optional.ofNullable(update.getDescription()).ifPresent(model::setDescription);
        Optional.ofNullable(update.getTitle()).ifPresent(model::setTitle);
        Optional.ofNullable(update.getDistributionDate()).ifPresent(model::setDistributionDate);

        System.out.println("\n\n\n\n\n");
        System.out.println("SZUBI-INFO-UPDATE-2: " + model);
        System.out.println("\n\n\n\n\n");

        return Response.ok(model).build();
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/self")
    public Response createEvent(MyRestResourceJsonModel model) {

        logger.debug("\n\n\n\n\nSZUBI-INFO-CREATE: " + model + "\n\n\n\n\n");

        model.setId(generateNewId());
        storageJson.add(model);
        //return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        return Response.ok(model).build();
    }

//    @DELETE
//    @Path("/self/{id}")
//    public Response deleteEvent(@PathParam("id") String id) {
//        storage.remove(findInStorage(id));
//        return Response.ok().build();
//    }

    private MyRestResourceJsonModel findInStorage(String id) {
        return storageJson.stream()
                .filter(item -> item.getId() == Long.parseLong(id))
                .findAny()
                .orElse(null);
    }

    private long generateNewId() {
        return storageJson.stream()
                .mapToLong(MyRestResourceJsonModel::getId)
                .max().orElse(0) + 1;
    }
}