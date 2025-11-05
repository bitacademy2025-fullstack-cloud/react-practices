package com.bit2025.ajax.controller.api;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bit2025.ajax.domain.Item;
import com.bit2025.ajax.dto.JsonResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/item")
public class ItemController {
	private final List<Item> items;
	
	public ItemController(@Qualifier("items") List<Item> items) {
		this.items = items;
	}
	
	@PostMapping(consumes={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<JsonResult<Item>> create(@RequestBody Item item) {
		log.info("Request[POST /item, Content-Type: application/json][{}]", item);
		
		Long maxId = items.isEmpty() ? 0L : items.getFirst().getId();
		item.setId(maxId + 1);
		
		items.addFirst(item);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(item));
	}

	@PostMapping(consumes={MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<JsonResult<Item>> create(Item item, MultipartFile file) {
		log.info("Request[POST /item, Content-Type: multipart/form-data][{}, {}]", item, file.getOriginalFilename());
		
		try {
			final String filename = UUID
					.randomUUID()
					.toString()
					.concat(file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")));
					
			Files.write(Files
					.createDirectories(Paths.get("/ajax-practices/uploads/images"))
					.resolve(filename), file.getBytes());
			
			Long maxId = items.isEmpty() ? 0L : items.getFirst().getId();
			item.setId(maxId + 1);
			item.setImage("/assets/images/" + filename);

			items.addFirst(item);
			
			return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(item));

		} catch(IOException ex) {
			throw new RuntimeException(ex);
		}
	}

	@GetMapping
	public ResponseEntity<JsonResult<List<Item>>> read() {
		log.info("Request[GET /item]");
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items));
	}

	@GetMapping("/{id}")
	public ResponseEntity<JsonResult<Item>> read(@PathVariable Long id) {
		log.info("Request[GET /item/{}]", id);
		
//		Item item = null;
//		for(int i = 0; i < items.size(); i++) {
//			if(items.get(i).getId() == id) {
//				item = items.get(i);
//				break;
//			}
//		}
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items
						.stream()
						.filter(item -> item.getId() == id)
						.findAny()
						.orElse(null)));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<JsonResult<Boolean>> delete(@PathVariable Long id) {
		log.info("Request[DELETE /item/{}]", id);
		
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(JsonResult.success(items.removeIf(item -> item.getId() == id)));
	}
	
}
