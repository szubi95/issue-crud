package com.example.plugins.tutorial.servlet;

import com.atlassian.templaterenderer.TemplateRenderer;
import com.google.common.collect.Maps;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ViewInitializerServlet extends HttpServlet{

    private TemplateRenderer templateRenderer;

    public ViewInitializerServlet(TemplateRenderer templateRenderer) {
        this.templateRenderer = templateRenderer;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        templateRenderer.render("vm/list.vm", Maps.newHashMap(), resp.getWriter());
    }
}